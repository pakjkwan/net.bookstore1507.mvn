package com.itbank.member;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.itbank.command.Command;
@Repository
public class MemberMapperImpl implements MemberMapper{
	private static final Logger logger = LoggerFactory.getLogger(MemberMapperImpl.class);
	String namespace = "com.bankspring.mapper.MemberMapper.";
	@Autowired
	private SqlSessionTemplate sqlSession;
	//***********************************************/	
	/*executeUpdate*/	
	//***********************************************/
	@Override
	public int insert(MemberDTO member) {
		return sqlSession.insert(
				namespace+"insert",member);
	}

	@Override
	public int update(MemberDTO member) {
		return sqlSession.update(
				namespace+"update",member);
	}

	@Override
	public int delete(MemberDTO member) {
		return sqlSession.delete(
				namespace+"delete",member);
	}
	//***********************************************/	
	/*executeQuery*/	
	//***********************************************/
	@Override
	public int count(Command command) {
		return sqlSession.selectOne(
				namespace+"count",command);
	}
	@Override
	public int size() {
		return sqlSession.selectOne(
				namespace+"size");
	}
	@Override
	public MemberDTO detail(Command command) {
		return sqlSession.selectOne(
				namespace+"detail",command);
	}

	@Override
	public List<MemberDTO> search(Command command) {
		logger.info("[ 매퍼 ] 이름으로 회원검색 : {}" , command.getSearchVal());
		logger.info("[ 매퍼 ] 이름으로 회원검색 : {}" , command.getStart());
		return sqlSession.selectList(
				namespace+"search",command);
	}

	@Override
	public List<MemberDTO> list(Command command) {
		logger.info("[매퍼] 전체 회원검색 : {}" , command.getPageNo());
		return sqlSession.selectList(
				namespace+"list",command);
	}

	@Override
	public MemberDTO login(Command command) {
		logger.info("[매퍼] 로그인 : {}" , command.getSearchKey());
		return sqlSession.selectOne(
				namespace+"login",command);
	}

	@Override
	public MemberDTO checkId(Command command) {
		logger.info("[매퍼] 아이디중복체크 : {}" , command.getSearchKey());
		return sqlSession.selectOne(
				namespace+"checkId",command);
	}

	
}
