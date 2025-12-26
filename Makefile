.PHONY: lint format check build dev clean help

# Default target
.DEFAULT_GOAL := help

# Lint with autofix
lint:
	@echo "Running Biome lint with autofix..."
	pnpm biome lint --write .

# Format code
format:
	@echo "Running Biome format..."
	pnpm biome format --write .

# Check both formatting and linting
check:
	@echo "Running format check..."
	pnpm biome format .
	@echo "Running lint check..."
	pnpm biome lint .

# Build production
build:
	@echo "Building production bundle..."
	pnpm build

# Start dev server
dev:
	@echo "Starting development server..."
	pnpm dev

# Clean build artifacts and dependencies
clean:
	@echo "Cleaning build artifacts and dependencies..."
	rm -rf .next
	rm -rf node_modules
	rm -rf .turbo
	rm -rf out
	@echo "Clean complete!"

# Help target
help:
	@echo "Available targets:"
	@echo "  make lint     - Run Biome lint with autofix"
	@echo "  make format   - Run Biome format"
	@echo "  make check    - Run format and lint checks (no autofix)"
	@echo "  make build    - Build production bundle"
	@echo "  make dev      - Start development server"
	@echo "  make clean    - Clean build artifacts and dependencies"
	@echo "  make help     - Show this help message"
