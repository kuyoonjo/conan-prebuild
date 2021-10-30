echo conan install %2@ -s arch=%1 --build=missing %3
conan install %2@ -s arch=%1 --build=missing %3
conan info %2@ -s arch=%1 %3 --paths --json %1.json
type %1.json
exit 0