Vagrant.configure("2") do |config|
  config.vm.box = "bento/centos-6.8"

  config.vm.network "private_network", type: "dhcp"
  config.vm.network "forwarded_port", guest: 80, host: 8080

  config.vm.provision "ansible_local" do |ansible|
    ansible.playbook = "playbook.yml"
    ansible.version = "2.2.1.0"
  end
end
