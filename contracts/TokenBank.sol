// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract TokenBank {
    /// @dev Tokenの名前
    string private _name;

    /// @dev Tokenのシンボル
    string private _symbol;

    /// @dev Tokenの総供給数
    uint256 constant _totalSupply = 1000;

    /// @dev TokenBankが預かっているTokenの総額
    uint256 private _bankTotalDeposit;

    /// @dev TokenBankのオーナー
    address public owner;

    /// @dev アカウントアドレス毎のToken残高
    mapping(address => uint256) private _balances;

    /// @dev TokenBankが預かっているToken残高
    mapping(address => uint256) private _tokenBankBalances;    

    /// @dev Token移転時のイベント
    event TokenTransfer(
        address indexed from,
        address indexed to,
        uint256 amount
    );

    /// @dev Token預入時のイベント
    event TokenDeposit(
        address indexed from,
        uint256 amount
    );

    /// @dev Token引出時のイベント
    event TokenWithdraw(
        address indexed from,
        uint256 amount
    );

    constructor (string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
        owner = msg.sender;
        _balances[owner] = _totalSupply;
    }

    /// @dev Tokenの名前を返す
    function name() public view returns (string memory) {
        return _name;
    }

    /// @dev Tokenのシンボルを返す
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /// @dev Tokenの総供給数を返す
    function totalSupply() public pure returns (uint256) {
        return _totalSupply;
    }

    /// @dev 指定アカウントアドレスのToken残高を返す
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }
}
