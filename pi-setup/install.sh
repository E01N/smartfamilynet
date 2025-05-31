#!/bin/bash

echo "[SmartFilter] Starting setup..."

# Enable SSH
touch /boot/ssh

# Move Wi-Fi config into place
if [ -f /boot/wpa_supplicant.conf ]; then
  echo "[SmartFilter] Copying Wi-Fi config..."
  sudo cp /boot/wpa_supplicant.conf /etc/wpa_supplicant/wpa_supplicant.conf
fi

# Update system
sudo apt update && sudo apt upgrade -y

# Install Pi-hole silently
echo "[SmartFilter] Installing Pi-hole..."
curl -sSL https://install.pi-hole.net | bash /dev/stdin --unattended

# Install SmartFilter agent
echo "[SmartFilter] Installing agent..."
bash /boot/agent-install.sh

echo "[SmartFilter] Setup complete. Rebooting..."
sudo reboot
