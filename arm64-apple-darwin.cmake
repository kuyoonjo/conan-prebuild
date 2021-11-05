set(CMAKE_SYSTEM_NAME Darwin)

set(arch arm64)

set(CMAKE_C_FLAGS -arch $arch)
set(CMAKE_CXX_FLAGS -arch $arch)
set(CMAKE_EXE_LINKER_FLAGS -arch $arch)
set(CMAKE_MODULE_LINKER_FLAGS -arch $arch)
set(CMAKE_SHARED_LINKER_FLAGS -arch $arch)
set(CMAKE_STATIC_LINKER_FLAGS -arch $arch)
