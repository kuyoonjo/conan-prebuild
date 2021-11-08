## prebuild all
```
./conan-prebuild openssl 1.1.1l
```
## prebuild one

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

```bash
gh workflow run macos --field build_target=openssl --field build_version=1.1.1l --field "build_flags=-s arch=x86_64" --field build_output_basename=openssl-1.1.1l-x86_64-apple-darwin13
```

```bash
gh workflow run macos --field build_target=openssl --field build_version=1.1.1l --field "build_flags=-s arch=armv8" --field build_output_basename=openssl-1.1.1l-arm64-apple-darwin20.3.0
```

## Cmake
```
cmake-prebuild zlib-ng 2.0.5 https://github.com/zlib-ng/zlib-ng.git 2.0.5 "" "-DZLIB_COMPAT=ON -DBUILD_SHARED_LIBS=OFF"
```
```
cmake-prebuild libcurl 7.79.1 https://github.com/curl/curl.git curl-7_79_1 openssl/1.1.1l,zlib-ng/2.0.5,libssh2/1.10.0 "-DBUILD_SHARED_LIBS=OFF -DBUILD_CURL_EXE=OFF -DCURL_STATIC_CRT=ON"
```
```
cmake-prebuild co 2021-11-06 https://github.com/idealvin/co.git master openssl/1.1.1l,zlib-ng/2.0.5,libssh2/1.10.0,libcurl/7.79.1 "-DWITH_LIBCURL=ON -DWITH_OPENSSL=ON -DSTATIC_VS_CRT=ON"
```
```
cmake-prebuild fmt 8.0.1 https://github.com/fmtlib/fmt.git 8.0.1 "" "-DCMAKE_MSVC_RUNTIME_LIBRARY=\"MultiThreaded$<$<CONFIG:Debug>:Debug>\""
```