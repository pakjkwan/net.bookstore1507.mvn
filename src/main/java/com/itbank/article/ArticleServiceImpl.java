package com.itbank.article;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itbank.command.Command;
@Service
public class ArticleServiceImpl implements ArticleService{
	private static final Logger logger = LoggerFactory.getLogger(ArticleServiceImpl.class);
	@Autowired private SqlSession sqlSession;
	//***********************************************/	
	/*executeUpdate*/	
	//***********************************************/	
	@Override
	public int insert(ArticleDTO article) {
		ArticleMapper mapper = sqlSession.getMapper(ArticleMapper.class);
		return mapper.insert(article);
	}

	@Override
	public int update(ArticleDTO article) {
		ArticleMapper mapper = sqlSession.getMapper(ArticleMapper.class);
		return mapper.update(article);
	}

	@Override
	public int delete(ArticleDTO article) {
		ArticleMapper mapper = sqlSession.getMapper(ArticleMapper.class);
		return mapper.delete(article);
	}
	//***********************************************/	
	/*executeQuery*/	
	//***********************************************/
	@Override
	public ArticleDTO detail(Command command) {
		ArticleMapper mapper = sqlSession.getMapper(ArticleMapper.class);
		return mapper.detail(command);
	}

	@Override
	public List<ArticleDTO> search(Command command) {
		ArticleMapper mapper = sqlSession.getMapper(ArticleMapper.class);
		return mapper.search(command);
	}

	@Override
	public List<ArticleDTO> list(Command command) {
		ArticleMapper mapper = sqlSession.getMapper(ArticleMapper.class);
		return mapper.list(command);
	}

	@Override
	public int count(Command command) {
		ArticleMapper mapper = sqlSession.getMapper(ArticleMapper.class);
		return mapper.count(command);
	}

	@Override
	public int size(Command command) {
		ArticleMapper mapper = sqlSession.getMapper(ArticleMapper.class);
		return mapper.size(command);
	}

}
