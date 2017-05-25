package com.itbank.member;

import java.util.List;

import com.itbank.command.Command;

public interface MemberService {
/*===== executeUpdate =====*/	
	
	/*insert : 회원가입*/
    public int insert(MemberDTO member);
    /*update : 회원정보 수정*/
    public int update(MemberDTO member);
    /*delete : 회원탈퇴*/
    public int delete(MemberDTO member);
    
/*===== executeQuery =====*/    
    
    /*getElementById : 회원상세정보*/
    public MemberDTO detail(Command command);
    /*getElementsByName : 검색어로 회원 검색*/
    public List<MemberDTO> search(Command command);
    /*list : 회원전체 목록*/
    public List<MemberDTO> list(Command command);
    /*count : 특정 회원수*/
    public int count(Command command);
    /*count : 전체 회원수*/
    public int size();
    
    /*login : 로그인*/
    public MemberDTO login(Command command);
    /*ID 중복체크*/
    public boolean checkId(Command command);
    
}
