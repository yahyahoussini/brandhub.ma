import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, FolderKanban, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Project {
  id: string;
  title: string;
  description: string | null;
  service_category: string;
  status: string;
  budget: number | null;
  deadline: string | null;
  created_at: string;
  client_id: string;
  profiles?: {
    full_name: string;
    email: string;
  };
}

export default function AdminProjects() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select(`
        *,
        profiles:profiles!client_id(full_name)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les projets",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    // Get user emails from auth
    const authResponse = await supabase.auth.admin.listUsers();
    const users = authResponse.data?.users || [];
    
    const projectsWithEmails = (data || []).map(project => ({
      ...project,
      profiles: {
        full_name: project.profiles?.full_name || "Inconnu",
        email: users.find(u => u.id === project.client_id)?.email || "N/A"
      }
    }));

    setProjects(projectsWithEmails as Project[]);
    setLoading(false);
  };

  const handleStatusChange = async (projectId: string, newStatus: string) => {
    const { error } = await supabase
      .from("projects")
      .update({ status: newStatus })
      .eq("id", projectId);

    if (error) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Succès",
        description: "Statut mis à jour"
      });
      loadProjects();
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-500/10 text-yellow-600",
      in_progress: "bg-blue-500/10 text-blue-600",
      completed: "bg-green-500/10 text-green-600",
      cancelled: "bg-red-500/10 text-red-600"
    };
    return colors[status] || "bg-gray-500/10 text-gray-600";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Gestion des Projets</h1>
        <p className="text-muted-foreground">
          {projects.length} projets au total
        </p>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <FolderKanban className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-lg">{project.title}</h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline">{project.service_category}</Badge>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                    {project.budget && (
                      <Badge variant="secondary">
                        {project.budget.toLocaleString()} MAD
                      </Badge>
                    )}
                  </div>

                  {project.profiles && (
                    <div className="text-sm text-muted-foreground">
                      Client: <span className="font-medium">{project.profiles.full_name}</span>
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground mt-2">
                    Créé le {new Date(project.created_at).toLocaleDateString()}
                    {project.deadline && ` • Échéance: ${new Date(project.deadline).toLocaleDateString()}`}
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Select
                    value={project.status}
                    onValueChange={(value) => handleStatusChange(project.id, value)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="in_progress">En cours</SelectItem>
                      <SelectItem value="completed">Terminé</SelectItem>
                      <SelectItem value="cancelled">Annulé</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedProject(project)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Détails
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {projects.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FolderKanban className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Aucun projet pour le moment</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Project Details Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedProject?.title}</DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedProject.description || "Aucune description"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Catégorie</h4>
                  <Badge variant="outline">{selectedProject.service_category}</Badge>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Statut</h4>
                  <Badge className={getStatusColor(selectedProject.status)}>
                    {selectedProject.status}
                  </Badge>
                </div>
              </div>

              {selectedProject.budget && (
                <div>
                  <h4 className="font-semibold mb-2">Budget</h4>
                  <p className="text-2xl font-bold">
                    {selectedProject.budget.toLocaleString()} MAD
                  </p>
                </div>
              )}

              {selectedProject.profiles && (
                <div>
                  <h4 className="font-semibold mb-2">Informations Client</h4>
                  <p className="text-sm"><strong>Nom:</strong> {selectedProject.profiles.full_name}</p>
                  <p className="text-sm"><strong>Email:</strong> {selectedProject.profiles.email}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}