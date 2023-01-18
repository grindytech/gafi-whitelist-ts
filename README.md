# GAFI-WHITELIST

  Provide offchain-worker whitelist

# Table of contents

- [Quick Start](#quick-start)
  - [Requirements](#requirements)
  - [Reference](#reference)
  - [Installation](#installation)
- [API](#API)
  - [create](#create)
  - [add](#add)
  - [verify](#verify)
  - [get](#get)

## Quick Start

 ```
 
  $ git clone https://github.com/grindytech/gafi-whitelist-ts
  
  $ cd gafi-whitelist
  
  $ yarn
  
  $ yarn start:dev
 
 ```

### Requirements

OS: Linux

Development environment: NodeJs


### Reference

### Installation

## API

### create

```
url: /whitelist/create

example: http://whitelist.gafi.network/whitelist/create

method: POST

Body: 
{
    "pool_id": "3bf5f0bc42626c7c630507f607fe85b344f9b857579c0c9ffd322611b6cd1275",
    "address": [
        "0x4a1fb7f41007295aa73476541986e12b976c47907e3bce162b835e46a9a3ff0b"
    ]
}

successResponse:
{
    "pool_id": "3bf5f0bc42626c7c630507f607fe85b344f9b857579c0c9ffd322611b6cd1275",
    "address": [
        "0x4a1fb7f41007295aa73476541986e12b976c47907e3bce162b835e46a9a3ff0b"
    ]
}
```

| RequestField  | Type | Description |
| ------------- | ------------- | ------------- |
| pool_id | string  |  64 characters |
| address | [string]  |  list of valid address(hex string)|

### add

 ```
description: add new addresses to whitelist

url: /whitelist/add

example: http://whitelist.gafi.network/whitelist/add

method: POST

Body:
{
    "pool_id": "3bf5f0bc42626c7c630507f607fe85b344f9b857579c0c9ffd322611b6cd1275",
    "address": [
        "0x58880deb6e45ea913801786036f0183d8357104647501dfec35c7eebca7a0406"
    ]
}


successResponse:
{
    "pool_id": "3bf5f0bc42626c7c630507f607fe85b344f9b857579c0c9ffd322611b6cd1275",
    "address": [
        "0x4a1fb7f41007295aa73476541986e12b976c47907e3bce162b835e46a9a3ff0b",
        "0x58880deb6e45ea913801786036f0183d8357104647501dfec35c7eebca7a0406"
    ]
}

```
| RequestField  | Type | Description |
| ------------- | ------------- | ------------- |
| pool_id | string  |  64 characters |
| address | [string]  |  list of valid address(hex string)|


### verify

 ```
url: /whitelist/verify?pool_id={}&address={}

example: http://whitelist.gafi.network/whitelist/verify?pool_id=3bf5f0bc42626c7c630507f607fe85b344f9b857579c0c9ffd322611b6cd1275&address=0x4a1fb7f41007295aa73476541986e12b976c47907e3bce162b835e46a9a3ff0b

method: GET

successResponse: true/false
```
| RequestField  | Type | Description |
| ------------- | ------------- | ------------- |
| pool_id | string  |  64 characters |
| address | string  |  valid address(hex string)|



### get

 ```
url: /whitelist/get?pool_id={}

example: http://whitelist.gafi.network/whitelist/get?pool_id=3bf5f0bc42626c7c630507f607fe85b344f9b857579c0c9ffd322611b6cd1275
method: GET

successResponse:
{
    "pool_id": "3bf5f0bc42626c7c630507f607fe85b344f9b857579c0c9ffd322611b6cd1275",
    "address": [
        "0x4a1fb7f41007295aa73476541986e12b976c47907e3bce162b835e46a9a3ff0b",
        "0x58880deb6e45ea913801786036f0183d8357104647501dfec35c7eebca7a0406"
    ]
}
```
| RequestField  | Type | Description |
| ------------- | ------------- | ------------- |
| pool_id | string  |  64 characters |

