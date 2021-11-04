set(CMAKE_SYSTEM_NAME Linux)
set(CMAKE_SYSTEM_PROCESSOR arm64)

set(triple "aarch64-linux-gnu")

set(CMAKE_FIND_ROOT_PATH "/usr/${triple}")
# set(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)
# set(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)
# set(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE ONLY)

set(CMAKE_C_COMPILER            ${triple}-gcc)
set(CMAKE_CXX_COMPILER          ${triple}-g++)
set(CMAKE_ASM_COMPILER          ${triple}-as)
set(CMAKE_AR                    ${triple}-ar)
set(CMAKE_LINKER                ${triple}-ld)
set(CMAKE_OBJCOPY               ${triple}-objcopy)
set(CMAKE_RANLIB                ${triple}-ranlib)
set(CMAKE_SIZE                  ${triple}-size)
set(CMAKE_STRIP                 ${triple}-strip)
set(CMAKE_CPP                   ${triple}-cpp)

set(CMAKE_TRY_COMPILE_TARGET_TYPE STATIC_LIBRARY)