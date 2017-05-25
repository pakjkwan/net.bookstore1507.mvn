package com.itbank.image;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itbank.command.Command;
import com.itbank.member.MemberServiceImpl;

@Service("imageService")
public class ImageServiceImpl implements ImageService{
	private static final Logger logger = LoggerFactory.getLogger(MemberServiceImpl.class);
	@Autowired private SqlSession sqlSession;
	//***********************************************/	
	/*executeUpdate*/	
	//***********************************************/	
	@Override
	public int insert(ImageDTO image) {
		logger.info("[ 서비스 ] 이미지 입력 : {}",image.getImage());
		ImageMapper mapper = sqlSession.getMapper(ImageMapper.class);
		return mapper.insert(image);
	}

	@Override
	public int update(ImageDTO image) {
		ImageMapper mapper = sqlSession.getMapper(ImageMapper.class);
				return mapper.insert(image);
	}

	@Override
	public int delete(ImageDTO image) {
		ImageMapper mapper = sqlSession.getMapper(ImageMapper.class);
				return mapper.insert(image);
	}
	//***********************************************/	
	/*executeQuery*/	
	//***********************************************/
	@Override
	public ImageDTO detail(Command command) {
		ImageMapper mapper = sqlSession.getMapper(ImageMapper.class);
				return mapper.detail(command);
	}

	@Override
	public List<ImageDTO> search(Command command) {
		ImageMapper mapper = sqlSession.getMapper(ImageMapper.class);
		return mapper.search(command);
	}

	@Override
	public List<ImageDTO> list(Command command) {
		ImageMapper mapper = sqlSession.getMapper(ImageMapper.class);
		return mapper.list(command);
	}

	@Override
	public int count(Command command) {
		ImageMapper mapper = sqlSession.getMapper(ImageMapper.class);
		return mapper.count(command);
	}

	@Override
	public int size(Command command) {
		ImageMapper mapper = sqlSession.getMapper(ImageMapper.class);
		return mapper.size(command);
	}
	
	

}
