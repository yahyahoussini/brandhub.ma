# 🤝 Contributing to BrandHub.ma

We love your input! We want to make contributing to BrandHub.ma as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## 🚀 Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## 🧪 Testing Guidelines

### Writing Tests

We use Jest and React Testing Library for testing. Please follow these guidelines:

- Write tests for all new components and functions
- Aim for at least 80% code coverage
- Test user interactions, not implementation details
- Use descriptive test names

Example test structure:
```typescript
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Test implementation
  });

  it('should handle user interactions', async () => {
    // Test user events
  });
});
```

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 💻 Code Style

### TypeScript

- Use TypeScript for all new code
- Enable strict mode
- Prefer interfaces over types for object shapes
- Use proper typing, avoid `any`

### React

- Use functional components with hooks
- Use React.memo for performance optimization when needed
- Keep components small and focused
- Use custom hooks for complex logic

### Styling

- Use Tailwind CSS for styling
- Follow mobile-first approach
- Use semantic class names
- Prefer composition over complex configurations

### File Organization

```
src/
├── components/
│   ├── ui/              # Base UI components
│   ├── __tests__/       # Component tests
│   └── ComponentName.tsx
├── pages/               # Route components
├── hooks/               # Custom hooks
└── lib/                 # Utilities
```

## 🔧 Development Setup

1. **Prerequisites**
   - Node.js 18+
   - Git

2. **Installation**
   ```bash
   git clone https://github.com/yourusername/brandhub-morocco-forge.git
   cd brandhub-morocco-forge
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Add your environment variables
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📝 Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

feat(auth): add OAuth integration
fix(ui): resolve button hover state
docs(readme): update installation steps
test(utils): add unit tests for helpers
```

### Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests
- `chore`: Changes to build process or auxiliary tools

## 🐛 Bug Reports

Great bug reports tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening)

Use our bug report template when creating issues.

## 💡 Feature Requests

We welcome feature requests! Please provide:

- **Is your feature request related to a problem?**
  A clear description of the problem you're trying to solve.

- **Describe the solution you'd like**
  A clear description of what you want to happen.

- **Describe alternatives you've considered**
  Any alternative solutions or features you've considered.

- **Additional context**
  Screenshots, mockups, or any other context.

## 🏗️ Architecture Guidelines

### Component Design

```typescript
interface ComponentProps {
  // Props should be well-typed
  title: string;
  children?: React.ReactNode;
  onAction?: () => void;
}

export const Component: React.FC<ComponentProps> = ({
  title,
  children,
  onAction
}) => {
  // Component implementation
};
```

### Hook Design

```typescript
interface UseFeatureOptions {
  enabled?: boolean;
}

interface UseFeatureReturn {
  data: Data | null;
  loading: boolean;
  error: Error | null;
}

export const useFeature = (
  options: UseFeatureOptions = {}
): UseFeatureReturn => {
  // Hook implementation
};
```

### API Integration

```typescript
// Use proper error handling
try {
  const { data, error } = await supabase
    .from('table')
    .select('*');
    
  if (error) throw error;
  
  return data;
} catch (error) {
  console.error('API Error:', error);
  throw error;
}
```

## 🔒 Security Guidelines

- Never commit sensitive data (API keys, passwords)
- Use environment variables for configuration
- Validate all user inputs
- Follow OWASP security practices
- Use TypeScript for type safety

## 📖 Documentation

- Update README.md for significant changes
- Add JSDoc comments for complex functions
- Update API documentation for new endpoints
- Include examples in documentation

## 🎨 UI/UX Guidelines

### Design Principles

- **Accessibility First**: Follow WCAG 2.1 guidelines
- **Mobile First**: Design for mobile, enhance for desktop
- **Performance**: Optimize for fast loading and smooth interactions
- **Consistency**: Use the design system components

### Component Development

```typescript
// Use forwardRef for custom components
const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants(), className)}
      {...props}
    />
  );
});
```

## 🔄 Release Process

1. **Version Bump**: Update version in package.json
2. **Changelog**: Update CHANGELOG.md
3. **Testing**: Ensure all tests pass
4. **Build**: Create production build
5. **Deploy**: Deploy to staging first, then production

## 📞 Getting Help

- **Discord**: Join our development channel
- **GitHub Issues**: For bugs and feature requests
- **Email**: tech@brandhub.ma for private inquiries

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in our README.md and release notes. We appreciate every contribution, no matter how small!

---

Thank you for contributing to BrandHub.ma! 🚀
