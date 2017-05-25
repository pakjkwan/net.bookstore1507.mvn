package com.itbank.member;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itbank.command.Command;


@Service("memberService")
public class MemberServiceImpl implements MemberService{
	private static final Logger logger = LoggerFactory.getLogger(MemberServiceImpl.class);
	
	@Autowired
	MemberMapperImpl memberMapper;

	//***********************************************/	
	/*executeUpdate*/	
	//***********************************************/	
    @Override
    public int insert(MemberDTO member) {
    	logger.info("[ 서비스 ] 회원가입 이름  = {}", member.getName());
        return memberMapper.insert(member);
    }
    @Override
	public int update(MemberDTO member) {
    	logger.info("[ 서비스 ] 회원수정 이름  = {}", member.getName());
		return memberMapper.update(member);
	}
	@Override
	public int delete(MemberDTO member) {
		logger.info("[ 서비스 ] 회원삭제 이름  = {}", member.getName());
		return memberMapper.delete(member);
	}
   
	//***********************************************/	
	/*executeQuery*/	
	//***********************************************/	
	@Override
	public MemberDTO detail(Command command) {
		logger.info("[ 서비스 ] 회원검색 아이디  = {}", command.getSearchVal());
		return memberMapper.detail(command);
	}
	@Override
	public List<MemberDTO> search(Command command) {
		logger.info("[ 서비스 ] 회원검색 이름  = {}", command.getSearchVal());
		return memberMapper.search(command);
	}
	
	@Override
	public MemberDTO login(Command command) {
		logger.info("[ 서비스 ] 로그인 아이디  = {}", command.getSearchKey());
		return memberMapper.login(command);
	}
    @Override
    public List<MemberDTO> list(Command command) {
    	logger.info("[ 서비스 ] 회원목록 페이지  = {}",command.getPageNo());
        return  memberMapper.list(command);
    }
	@Override
	public int size() {
		return memberMapper.size();
	}
	@Override
	public int count(Command command) {
		return memberMapper.count(command);
	}
	@Override
	public boolean checkId(Command command) {
		MemberDTO member = memberMapper.checkId(command);
		return false;
	}
}
