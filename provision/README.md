# Provision Vagrant with Ansible

### Requirements

You'll need [Vagrant](https://www.vagrantup.com/) and [Ansible](https://docs.ansible.com/ansible/intro_installation.html) for this exercise.

### The task(s)

Generally, your submission should demonstrate good security practices. Show us your understanding of security best-practices: TLS/SSL settings in your nginx configuration, how you manage third-party dependencies, and restrict access to sensitive files.

#### Part one

Complete the `config/nginx.conf` by writing a `server` directive(s) that proxies to the upstream `application`.

Requirements:

- Nginx should accept requests on ports 80 and 443
- All `http` requests should permanently redirect to their `https` equivalent
- Use the provided `files/self-signed.crt` and `files/self-signed.key` for your SSL configuration
- Your SSL configuration should use modern, secure protocols and ciphers
- Nginx should proxy requests to the application using an `upstream` directive
- Pass headers `X-Forwarded-For` and `X-Real-IP` to the upstream application with appropriate values

#### Part two

Complete `playbook.yml` such that it:

- Installs nginx and runit
- Copies `config/nginx.conf`, `files/self-signed.key` and `files/self-signed.crt` to appropriate locations on the destination box
- Ensure appropriate file permissions are set for each of the three files mentioned above
- Copies and unzips/untars the contents of application.zip to `/opt/application/` on the destination box
- Installs and configures the application's `run` script as a runit service
- Starts nginx using the configuration you completed and copied to the box

### Checking your work

You can test that your playbook works by running `./provision.sh`.

Be aware that `provision.sh` destroys and recreates the Vagrant box each time it is run.

A working configuration will render:

```
Pass: status code is 200
Pass: X-Forwarded-For is present and not 'None'
Pass: X-Real-IP is present and not 'None'
Pass: found "It's easier to ask forgiveness than it is to get permission." in response
```

### Tips & Guidance:

- You can find a suitable runit package at https://packagecloud.io/imeyer/runit
- Do not alter the `Vagrantfile`.
- Do not include `.vagrant/`, `.retry` files, or other detritus.
- Do add notes on running your solution, or why you choose a particular solution, in a COMMENTS.md file.
- Avoid chaining commands using `|` and `&&` in your `playbook.yml`
