package com.itbank.user;

public class UserDTO {
	private String name;
	public UserDTO() {}
	public UserDTO(String name) {
		this.name = name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getName() {
		return name;
	}
}
