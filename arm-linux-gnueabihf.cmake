set(CMAKE_SYSTEM_NAME Linux)
set(CMAKE_SYSTEM_PROCESSOR arm)

set(triple "arm-linux-gnueabihf")

set(CMAKE_FIND_ROOT_PATH "/usr/${triple}")
# set(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)
# set(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)
# set(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE ONLY)

set(CMAKE_C_COMPILER            ${triple}-gcc)
set(CMAKE_CXX_COMPILER          ${triple}-g++)
set(CMAKE_ASM_COMPILER          ${triple}-gcc)
set(CMAKE_AR                    ${triple}-ar)
set(CMAKE_LINKER                ${triple}-ld)
set(CMAKE_OBJCOPY               ${triple}-objcopy)
set(CMAKE_RANLIB                ${triple}-ranlib)
set(CMAKE_SIZE                  ${triple}-size)
set(CMAKE_STRIP                 ${triple}-strip)
set(CMAKE_CPP                   ${triple}-cpp)

set(CMAKE_TRY_COMPILE_TARGET_TYPE STATIC_LIBRARY)

set(CMAKE_C_FLAGS -mfloat-abi=hard)
set(CMAKE_CXX_FLAGS -mfloat-abi=hard)
set(CMAKE_ASM_FLAGS -mfloat-abi=hard)
set(CMAKE_EXE_LINKER_FLAGS -mfloat-abi=hard)
set(CMAKE_MODULE_LINKER_FLAGS -mfloat-abi=hard)
set(CMAKE_SHARED_LINKER_FLAGS -mfloat-abi=hard)