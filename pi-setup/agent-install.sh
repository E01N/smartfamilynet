#!/bin/bash

echo "[SmartFilter] Installing SmartFilter agent..."

# Install Node.js LTS
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs git

# Clone your repo or pull agent file (you’ll host it later)
mkdir -p /opt/smartfilter
cp /boot/smartfilter-agent.js /opt/smartfilter/agent.js

# Create systemd service
cat <<EOL | sudo tee /etc/systemd/system/smartfilter.service
[Unit]
Description=SmartFilter Agent
After=network.target

[Service]
ExecStart=/usr/bin/node /opt/smartfilter/agent.js
Restart=always
User=pi
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOL

sudo systemctl daemon-reexec
sudo systemctl enable smartfilter
sudo systemctl start smartfilter

echo "[SmartFilter] Agent installed and running."
