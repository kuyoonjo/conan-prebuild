```bash
gh workflow run win --field build_target=openssl --field build_version=1.1.1l --field "build_flags=-s arch=x86_64 -s compiler.runtime=MT" --field build_output_basename=openssl-1.1.1l-x86_64-pc-windows-msvc-MT
```

```bash
gh workflow run win --field build_target=openssl --field build_version=1.1.1l --field "build_flags=-s arch=x86 -s compiler.runtime=MT" --field build_output_basename=openssl-1.1.1l-i386-pc-win32-MT
```

```bash
gh workflow run linux-x64 --field build_target=openssl --field build_version=1.1.1l --field "build_flags=-s arch=x86_64" --field build_output_basename=openssl-1.1.1l-x86_64-linux-gnu
```

```bash
gh workflow run linux-x86 --field build_target=openssl --field build_version=1.1.1l --field "build_flags=-s arch=x86" --field build_output_basename=openssl-1.1.1l-i386-linux-gnu
```

```bash
gh workflow run linux-armv7 --field build_target=openssl --field build_version=1.1.1l --field "build_flags=-pr arm-linux-gnueabihf.profile" --field build_output_basename=openssl-1.1.1l-arm-linux-gnueabihf
```

```bash
gh workflow run linux-armv8 --field build_target=openssl --field build_version=1.1.1l --field "build_flags=-pr aarch64-linux-gnu.profile" --field build_output_basename=openssl-1.1.1l-aarch64-linux-gnu
```
