#!/bin/bash

# setup.sh

# Check if Node.js is already installed
if command -v node &> /dev/null && command -v npm &> /dev/null
then
    echo "Node.js is already installed:"
    node -v
    npm -v
    exit 0
fi

echo "Node.js not found. Proceeding with installation..."

# Detect OS and architecture
OS=$(uname -s)
ARCH=$(uname -m)

NODE_VERSION="14.17.0"

# Determine download URL
if [ "$OS" = "Linux" ]; then
    PLATFORM="linux"
elif [ "$OS" = "Darwin" ]; then
    PLATFORM="darwin"
    # For macOS, we'll use Homebrew if it's available
    if command -v brew &> /dev/null; then
        echo "Homebrew found. Installing Node.js using brew..."
        brew install node@14
        echo "Node.js installation completed."
        node -v
        npm -v
        exit 0
    fi
else
    echo "Unsupported OS: $OS"
    exit 1
fi

if [ "$ARCH" = "x86_64" ]; then
    ARCH="x64"
elif [ "$ARCH" = "arm64" ]; then
    ARCH="arm64"
else
    echo "Unsupported architecture: $ARCH"
    exit 1
fi

FILENAME="node-v$NODE_VERSION-$PLATFORM-$ARCH.tar.gz"
URL="https://nodejs.org/dist/v$NODE_VERSION/$FILENAME"

echo "Downloading Node.js from $URL"

curl -O $URL

echo "Extracting $FILENAME"

tar -xzf $FILENAME

echo "Setting up Node.js"

# Move node binaries to /usr/local (requires sudo)
sudo mv node-v$NODE_VERSION-$PLATFORM-$ARCH /usr/local/node

# Update PATH for the current session and add to shell configuration
export PATH=/usr/local/node/bin:$PATH

if [ -f ~/.bash_profile ]; then
    echo 'export PATH=/usr/local/node/bin:$PATH' >> ~/.bash_profile
    source ~/.bash_profile
elif [ -f ~/.zshrc ]; then
    echo 'export PATH=/usr/local/node/bin:$PATH' >> ~/.zshrc
    source ~/.zshrc
else
    echo 'export PATH=/usr/local/node/bin:$PATH' >> ~/.profile
    source ~/.profile
fi

echo "Node.js installation completed."

node -v
npm -v

# Clean up
rm $FILENAME
