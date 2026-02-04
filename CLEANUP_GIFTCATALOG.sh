#!/bin/bash

# GiftCatalog-ALL Cleanup Script
# Cleans up the project for portfolio presentation

echo "🧹 Starting GiftCatalog-ALL cleanup..."

# Remove Python virtual environment
echo "📦 Removing Python venv..."
rm -rf venv/

# Remove sensitive files
echo "🔒 Removing sensitive files..."
find . -name "*.session" -type f -delete
find . -name "*.db" -type f -delete
find . -name ".env" -type f -delete
find . -name ".env.local" -type f -delete

# Remove build artifacts
echo "🏗️  Removing build artifacts..."
rm -rf .next/
rm -rf node_modules/
rm -rf dist/
rm -rf build/

# Remove lock files (keep package-lock.json)
echo "🔐 Cleaning lock files..."
rm -f bun.lock
rm -f yarn.lock
rm -f pnpm-lock.yaml

# Remove unnecessary config files
echo "⚙️  Removing unnecessary configs..."
rm -f railway.toml
rm -f biome.json

# Remove loose JSON files in root
echo "📄 Cleaning root directory..."
rm -f "donation page duck.json"
rm -f duck_invitation.json
rm -f backdrops.json
rm -f attribute-filters.tsx

# Remove shell scripts
echo "🐚 Removing shell scripts..."
rm -f download_gifts.sh

# Remove database setup scripts
echo "🗄️  Removing database scripts..."
rm -f src/check-db.js
rm -f src/create-db.js

# Create organized structure
echo "📁 Creating organized structure..."
mkdir -p docs
mkdir -p config

# Move config files
if [ -f "netlify.toml" ]; then
    mv netlify.toml config/
fi

echo "✅ Cleanup complete!"
echo ""
echo "📊 Project structure cleaned and ready for portfolio!"
