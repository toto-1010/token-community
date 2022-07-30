// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract TokenBank {
    // Tokenの名前
    string private _name;

    // Tokenのシンボル
    string private _symbol;

    // Tokenの総供給数
    uint256 constant _totalSupply = 1000;

    // TokenBankが預かっているTokenの総額
    uint256 private _bankTotalDeposit;

    // TokenBankのオーナー
    address public owner;

    // アカウントアドレス毎のToken残高
    mapping(address => uint256) private _balances;

    // TokenBankが預かっているToken残高
    mapping(address => uint256) private _tokenBankBalances;    
}
