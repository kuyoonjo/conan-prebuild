> POST https://ci.appveyor.com/api/account/kuyoonjo/builds
```json
{
    "accountName": "kuyoonjo",
    "projectSlug": "conan-prebuild",
    "branch": "main",
    "environmentVariables": {
       "build_target": "openssl",
       "build_version": "1.1.1l",
       "build_flags": "-s arch=x86 -s compiler.runtime=MD",
       "build_output_basename": "openssl-1.1.1l-i386-pc-win32-MD"
    }
}
```