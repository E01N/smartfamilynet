#!/bin/bash

echo "[SmartFilter] Setting up hotspot for Wi-Fi config..."

sudo apt install -y dnsmasq hostapd

# Stop services while we configure
sudo systemctl stop dnsmasq
sudo systemctl stop hostapd

# Configure static IP for wlan0
cat <<EOF | sudo tee /etc/dhcpcd.conf
interface wlan0
    static ip_address=192.168.4.1/24
    nohook wpa_supplicant
EOF

# DHCP server config (dnsmasq)
cat <<EOF | sudo tee /etc/dnsmasq.conf
interface=wlan0
dhcp-range=192.168.4.2,192.168.4.20,255.255.255.0,24h
EOF

# Wi-Fi hotspot config
cat <<EOF | sudo tee /etc/hostapd/hostapd.conf
interface=wlan0
driver=nl80211
ssid=SmartFilter-Setup
hw_mode=g
channel=7
wmm_enabled=0
macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
EOF

sudo sed -i 's|#DAEMON_CONF="".*|DAEMON_CONF="/etc/hostapd/hostapd.conf"|' /etc/default/hostapd

# Start simple HTTP server to host portal
sudo apt install -y nginx
sudo cp -r /boot/portal/* /var/www/html/

sudo systemctl enable dnsmasq
sudo systemctl enable hostapd
sudo systemctl restart dnsmasq
sudo systemctl restart hostapd
sudo systemctl restart nginx

echo "[SmartFilter] Hotspot active. Visit http://192.168.4.1 to set up Wi-Fi."
