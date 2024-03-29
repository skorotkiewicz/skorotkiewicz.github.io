---
title: "Stockfish 13 vs Stockfish 14"
date: 2021-07-27T22:41:27+02:00
year: "2021"
month: "2021/07"
# categories:
#   - Posts
tags:
  - stockfish
  - chess
  - macos
  - socket.io
  - node
  - react
slug: stockfish13-vs-stockfish14
draft: false
---

I wrote a simple API server with socket.io in NodeJS that spawns a child_process, (stockfish's).  
Which allowed me to write a small App in React with [chessground](https://www.npmjs.com/package/chessground) (component from lichess.org) to graphically present the game with stockfish. :)

> Stockfish 13 installed from [brew](https://brew.sh/) on macOS and Stockfish 14 compiled on macOS from source code.

These are my results:

## Start FEN for every tests: `rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1`

### `Stockfish 13 vs Stockfish 13` (394 steps with depth 10) => `Checkmate`

```
    Bb5+ Nd7 Qe2+ Qe7 Rxa8 Qxe2+ Kxe2 Rxh1 Rxc8+ Kf7 Kf1 Ngf6 Bc4+ Kg7 Kg2 Rh4 Nf3 Rg4+ Kf1 Bd6 Be2 Ne4 Nbd2 Ng3+ Ke1 Nxe2 Kxe2 Bf4 Rc4 Nf6 Bb2 Kf7 Kd3 Ke7 Bd4 Nd5 Bc5+ Ke6 Re4+ Kf5 Nd4+ Kg6 N2f3 Nf6 Re7 Rg3 Re6 Kf7 Kc4 Rg4 Kc3 Rg8 Kd3 Re8 Ra6 Ne4 Bb4 Nf2+ Kc4 Ng4 Bc5 Ne3+ Kb3 Nd5 Nb5 Rb8 Kc4 Nf6 Bd4 Nd7 Rc6 Ra8 Nc3 Re8 Kd5 Ke7 Ke4 Bc7 Kf5 Rf8+ Ke4 Re8 Nd5+ Kd8+ Kf5 Rf8+ Ke4 Re8+ Kd3 Ne5+ Bxe5 Bxe5 Rg6 Kd7 Ng5 Rh8 Nb6+ Kc7 Nc4 Ba1 Rd6 Rh4 Ne6+ Kb7 Rb6+ Kc8 Ra6 Rh1 Ra7 Kb8 Re7 Re1 Nb6 Rb1 Nd7+ Kb7 Ne5+ Ka6 Nc4 Rg1 Rc7 Kb5 Ke4 Rh1 Nf4 Rh6 Na3+ Ka4 Nc2 Bb2 Ne3 Rh8 Nfd5 Kb3 Rb7+ Ka2 Kd3 Rh4 Rb8 Rh3 Nf4 Rh8 Rb5 Bc1 Rc5 Bxe3 Kxe3 Kb3 Nd3 Rh3+ Ke4 Rh8 Rc7 Rb8 Ke3 Rg8 Rb7+ Kc4 Rd7 Rg3+ Ke2 Kb5 Kf2 Rh3 Kg1 Rh6 Ne5 Ra6 Rb7+ Kc5 Kh2 Kd6 Rb5 Ra1 Kg3 Rd1 Nc4+ Kc6 Rb8 Rd4 Na3 Kd7 Rb7+ Kc6 Rb3 Kc5 Kf2 Rh4 Rc3+ Kb4 Rf3 Ka4 Kg1 Rd4 Kg2 Rd1 Kf2 Rd2+ Ke1 Rh2 Nb1 Rh6 Nc3+ Ka3 Kf2 Rh7 Nd1+ Ka4 Rf8 Rh6 Rb8 Re6 Kf3 Rf6+ Ke4 Ka5 Ke5 Rc6 Kd4 Ka6 Rb2 Rc8 Ra2+ Kb5 Ra1 Re8 Nc3+ Kb4 Rh1 Ka3 Kc4 Rc8+ Kd3 Rd8+ Kc2 Kb4 Kb2 Kc4 Kc2 Kc5 Ne2 Rd5 Nc3 Re5 Kd2 Rf5 Ne4+ Kb4 Nc3 Rf2+ Kd1 Kxc3 Kc1 Kb4 Kb1 Kc4 Rh6 Kc5 Rh4 Kb5 Rh1 Kc6 Rc1+ Kd6 Rc2 Rf7 Ka1 Ke5 Kb2 Kd5 Ka3 Rf8 Rc1 Rb8 Rc7 Rh8 Kb2 Ke4 Kb3 Kf4 Ka4 Ke3 Ra7 Rb8 Ra6 Kf4 Ka3 Ke3 Rd6 Kf2 Re6 Kf3 Ka2 Kg3 Ka3 Kf2 Re7 Kf3 Re6 Rb1 Rf6+ Ke3 Ka4 Rb8 Rf1 Ke4 Re1+ Kd4 Rh1 Ke3 Ka5 Kf3 Rh4 Ke2 Rh3 Kf2 Rh2+ Kf3 Rh4 Ke3 Ka6 Rb1 Ra4 Kf3 Ka7 Rb3 Ka6 Rb8 Rc4 Kf2 Rc1 Ke3 Re1+ Kd3 Re6 Rb1 Rg6 Ke3 Rg5 Kf4 Ra5 Kg4 Ra2 Kh3 Ka5 Rc1 Ka4 Rc4+ Ka5 Rc1 Rd2 Rb1 Ra2 Ra1 Rxa1 Kh4 Kb6 Kh5 Rg1 Kh4 Rg6 Kh5 Re6 Kh4 Re3 Kh5 Kc5 Kh4 Re5 Kh3 Kd4 Kh4 Kc5 Kh3 Kd5 Kh4 Ke4 Kg3 Ke3 Kg4 Ra5 Kg3 Ra4 Kg2 Rg4+ Kh2 Kf4 Kh3 Kf3 Kh2 Rh4+ Kg1 Rh3 Kf1
```

### `Stockfish 14 vs Stockfish 14` (80 steps with depth 10) => `Checkmate`

```
Bb5+ Nd7 Qe2+ Qe7 Rxa8 Qxe2+ Bxe2 Rxh1 Rxc8+ Kf7 Kf1 Ne7 Rc7 Ne5 Nd2 Ke6 Kg2 Rh8 Ndf3 Rg8+ Kh3 N7g6 Rc3 Bd6 Bd1 Nxf3 Nxf3 Rh8+ Kg4 Ne5+ Nxe5 Bxe5 Rd3 Rc8 Bb3+ Kf6 Bg5+ Kg6 Be6 Rf8 Rd7 Rf1 Be3 Bb2 Bc4 Re1 Re7 Bc1 Re6+ Kf7 Re4+ Kg6 Re6+ Kf7 Kf5 Rxe3 Rxe3+ Kf8 Re6 Bh6 Rxh6 Ke7 Rh7+ Kd6 Rh4 Kc5 Ke5 Kc6 Rh7 Kc5 Bd5 Kb5 Kd4 Kb4 Rb7+ Ka5 Kc5 Ka6 Re7 Ka5
```

### `Stockfish 13 (black) vs Stockfish 14 (white)` (72 steps with depth 10) => `Checkmate`

```
Bb5+ Nd7 Qe2+ Qe7 Rxa8 Qxe2+ Bxe2 Rxh1 Rxc8+ Kf7 Kf1 Bc5 Bc4+ Kf6 Bb2+ Kf5 Rxg8 Bxg1 Rxg1 Rxg1+ Kxg1 Nc5 Nd2 Kf4 Ba3 Na4 Bb4 Nb6 Bc5 Nd7 Bd4 Kg5 Ne4+ Kf5 Nc5 Nb6 Be6+ Kg5 Ne4+ Kf4 Bxb6 Kxe4 Kg2 Ke5 Bg4 Kd6 Bf3 Ke7 Kg3 Ke8 Kf4 Kd7 Ke5 Ke8 Ke6 Kf8 Kf6 Ke8 Bc6+ Kf8 Bd5 Ke8 Bc6+ Kf8 Bc5+ Kg8 Be4 Kh8 Kg6 Kg8 Bd5+ Kh8
```

### `Stockfish 13 (white) vs Stockfish 14 (black)` (157 steps with depth 10) => `Draw`

```
Bb5+ Nd7 Qe2+ Qe7 Rxa8 Qxe2+ Kxe2 Rxh1 Rxc8+ Kf7 Kf1 Ngf6 Bc4+ Kg6 Kg2 Rh5 Bd3+ Kf7 Bc4+ Kg7 Nf3 Rc5 Rxc5 Bxc5 Nc3 Ne5 Nxe5 Bd4 Ne4 Bxe5 Ng3 Ba1 Kf3 Nd7 Ke4 Kg6 Be3 Nf6+ Kf3 Nd7 Bb5 Nf6 Bc4 Be5 Bb3 Bb8 Be6 Be5 Ne2 Ba1 Nf4+ Kg7 Bc8 Kf7 Be6+ Ke8 Nd3 Ke7 Bc4 Kd7 Bg1 Kc8 Kf4 Ne8 Nb4 Bc3 Bc5 Nc7 Kf5 Kb7 Bd3 Kc8 Kg6 Kb8 Kf5 Kc8 Be4 Nb5 Ke6 Bd4 Bf8 Bc3 Kd5 Bb2 Kc4 Nc7 Bg6 Kd8 Nd3 Bf6 Bc5 Ne6 Bb4 Ba1 Be4 Ng7 Bg6 Ne6 Bd6 Nc7 Nc5 Ne8 Bg3 Nf6 Bf4 Ke7 Bg5 Kd6 Nb3 Be5 Bxf6 Bxf6 Bb1 Bg5 Be4 Ke5 Bg2 Be3 Na1 Ke6 Kb5 Bd4 Nc2 Bg1 Kc4 Kf6 Bf1 Ke5 Na1 Ba7 Nc2 Bg1 Nb4 Kd6 Nd3 Bh2 Nc1 Ke5 Kb3 Ke4 Bb5 Ke3 Kc4 Bd6 Kb3 Be5 Kc4 Bg3 Ba6 Bh4 Kb3 Be1 Bb5 Bd2 Kc2 Bxc1 Bc4
```
