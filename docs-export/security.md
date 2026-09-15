---
title: Security
description: Security practices and features for v0
product: v0
type: guide
---

# Security

v0 is built with security as a fundamental principle, implementing multiple layers of protection to ensure your code and data remain secure throughout the development process.

## General security approach

### Threat model and code validation

From a threat model perspective, v0 doesn't take LLM-generated code for granted. We consider all code potentially incorrect or adversarial, implementing robust validation and security measures:

- **Code Analysis**: All generated code undergoes security analysis before execution
- **Sandboxed Execution**: Code runs in isolated environments to prevent system access
- **Input Validation**: Comprehensive validation of all user inputs and generated content
- **Adversarial Testing**: Regular security testing against potential attack vectors

### Environment variable security

v0 leverages Next.js's strong distinction between server-side and client-side environment variables:

- **Server-side tokens**: Environment variables without the `NEXT_PUBLIC_` prefix remain secure on the server
- **Client-side tokens**: Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- **Automatic Analysis**: v0 analyzes `NEXT_PUBLIC_` usage and warns users about potential security risks
- **Smart Refactoring**: The AI can move code to Route Handlers, Server Actions, or other server-side contexts to improve security

### Code execution security

When v0 deploys to Vercel, server-side code becomes secure Functions that run in isolated sandboxes:

- **Isolated Execution**: Each function runs in its own secure container
- **Encrypted Environment**: Environment variables are stored in Vercel's built-in secure vault
- **Network Isolation**: Functions have controlled network access
- **Resource Limits**: Memory and execution time limits prevent resource exhaustion attacks

## Enterprise security features

Enterprise plans include advanced security features designed for organizations with strict compliance and security requirements.

### Data privacy and training

- **Opt-out of Data Training**: Enterprise customers can opt out of having their content used for model training
- **Data Isolation**: Enterprise data is processed on separate infrastructure
- **No Cross-contamination**: Your data never influences models used by other customers

### Access control

- **Single Sign-On (SSO)**: SAML-based SSO integration with your existing identity provider
- **Role-based Access Control**: Granular permissions for different team members
- **Audit Logs**: Comprehensive logging of all user actions for compliance
- **Session Management**: Advanced session controls and timeout policies

### Team Security

Enterprise teams benefit from enhanced collaboration security:

- **Private Workspaces**: Isolated environments for sensitive projects
- **Approval Workflows**: Request and manage reviews before deployment
- **Version Control**: Track all changes with detailed history
- **Secure Sharing**: Control who can access and modify shared projects

### Compliance and certifications

- **SOC 2 Type 2**: v0 is included in Vercel's SOC 2 Type 2 attestation for Security, Confidentiality, and Availability
- **GDPR Compliance**: Full compliance with European data protection regulations
- **Enterprise Support**: Dedicated support channels for security-related inquiries

## Best practices

### Environment variables

- Never expose sensitive tokens with `NEXT_PUBLIC_` prefix
- Use Vercel's environment variable management for production deployments
- Regularly rotate API keys and secrets
- Use different keys for development and production environments

### Team collaboration

- Set appropriate access levels for team members
- Use private workspaces for sensitive projects
- Enable audit logging for compliance requirements
- Regularly review team member permissions

## Security reporting

If you discover a security vulnerability in v0, please report it to our security team at security@vercel.com. We take all security reports seriously and will respond promptly.

For more information about Vercel's security practices, visit security.vercel.com.
