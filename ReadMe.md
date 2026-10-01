# Codebase Assistant

Codebase Assistant lets you explore a GitHub repository by asking questions about its code in natural language.

Instead of manually searching through an unfamiliar codebase, add a repository to your workspace and ask questions such as:

- Where is user login handled?
- How are repositories added to a workspace?
- What happens when a repository is queued?
- What does this function do?
- Where is this API endpoint implemented?

The assistant searches the indexed source code, retrieves the most relevant functions, methods, and classes, and uses them as context to generate a grounded answer. Answers can refer to the relevant files and line numbers.

## How It Works

1. **Add a repository** — Provide a GitHub repository link.
2. **Index the repository** — The repository is added to a background queue for processing.
3. **Extract code** — Supported source files are parsed into functions, methods, and classes.
4. **Index the code** — Extracted code sections are stored along with their file names and line numbers.
5. **Ask a question** — Select a repository and ask about its code in natural language.
6. **Retrieve relevant code** — The assistant finds the code sections most closely related to the question.
7. **Generate an answer** — The language model uses the retrieved code as context to answer the question.

If a repository has already been indexed by another user, the existing indexed copy is reused when adding it to a workspace.

## Features

- User registration and authentication
- GitHub repository integration
- Repository indexing in the background
- Workspace-based repository selection
- Natural-language codebase questions
- Code retrieval based on semantic similarity
- Answers grounded in retrieved source code
- File and line-number references
- Shared repository indexing across users
- Local language-model integration

## Supported Languages

The code index currently supports:

- JavaScript (`.js`)
- JSX (`.jsx`)
- TypeScript (`.ts`)
- TSX (`.tsx`)
- Python (`.py`)
- Java (`.java`)
- Go (`.go`)
- Rust (`.rs`)

The index focuses on functions, methods, and classes while skipping common generated and dependency directories.

## What Gets Indexed

Code is broken down into searchable sections rather than treating an entire repository as one large document.

Each indexed section contains:

- Repository
- File path
- Starting and ending line numbers
- Extracted function, method, or class
- Vector representation used for retrieval

When a question is asked, only a small set of the most relevant sections are provided to the language model as context.

This keeps the context focused on the parts of the code most likely to answer the question.

## Architecture

```text
                    ┌─────────────────┐
                    │    Frontend     │
                    │                 │
                    │ React / Vite    │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │     Backend     │
                    │                 │
                    │ Express / Node  │
                    └───────┬─────────┘
                            │
             ┌──────────────┼──────────────┐
             │              │              │
             ▼              ▼              ▼
      ┌────────────┐ ┌────────────┐ ┌────────────┐
      │ PostgreSQL │ │   Redis    │ │   GitHub   │
      │ + Vectors  │ │   Queue    │ │    API     │
      └────────────┘ └─────┬──────┘ └────────────┘
                           │
                           ▼
                ┌─────────────────────────┐
                │          Worker         │
                │                         │
                │  Clone → Parse → Index  │
                │                         │
                └────────────┬────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │     Ollama      │
                    │ Local LLM       │
                    └─────────────────┘
```
