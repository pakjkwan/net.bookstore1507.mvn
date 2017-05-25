package com.itbank.member;

import java.util.List;

import com.itbank.command.Command;



public interface MemberMapper {

	//***********************************************/	
	/*executeUpdate*/	
	//***********************************************/	
	public int insert(MemberDTO member);
	public int update(MemberDTO member);
	public int delete(MemberDTO member);
	//***********************************************/	
	/*executeQuery*/	
	//***********************************************/
	public MemberDTO detail(Command command);
	public List<MemberDTO> search(Command command);
	public List<MemberDTO> list(Command command);
	public int count(Command command);
	public int size();
	public MemberDTO login(Command command);
	public MemberDTO checkId(Command command);
}

