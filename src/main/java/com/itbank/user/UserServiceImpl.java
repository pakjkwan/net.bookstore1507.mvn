package com.itbank.user;

public class UserServiceImpl implements UserService{
	private UserDTO user;
	@Override
	public void test() {
		System.out.println(user.getName());
	}
	public UserServiceImpl() {}
	public UserServiceImpl(UserDTO user) {
		this.user = user;
	}
	public UserDTO getUser() {
		return user;
	}
	public void setUser(UserDTO user) {
		this.user = user;
	}
	
}
