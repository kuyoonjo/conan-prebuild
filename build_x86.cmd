echo conan install %1@ -s arch=x86 -s compiler.runtime=MT --build %2
conan install %1@ -s arch=x86 -s compiler.runtime=MT --build %2
exit 0