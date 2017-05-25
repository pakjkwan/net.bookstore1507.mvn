package com.itbank.member;

import java.util.Date;

import org.springframework.stereotype.Component;
@Component
public class MemberDTO {
	private String userid;
	private String name;
	private String age;
	private String password;
	private String email; 
	private int isAdmin; // 관리자 1, 일반유저 0
	private Date regDate; // 회원가입일
	private String profile; // 프로필 이미지
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAge() {
		return age;
	}
	public void setAge(String age) {
		this.age = age;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public int getIsAdmin() {
		return isAdmin;
	}
	public void setIsAdmin(int isAdmin) {
		this.isAdmin = isAdmin;
	}
	public Date getRegDate() {
		return regDate;
	}
	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}
	public String getProfile() {
		return profile;
	}
	public void setProfile(String profile) {
		this.profile = profile;
	}
	@Override
	public String toString() {
		return "MemberDto [userid=" + userid + ", name=" + name + ", age=" + age + ", password=" + password + ", email="
				+ email + ", isAdmin=" + isAdmin + ", regDate=" + regDate + ", profile=" + profile + "]";
	}
	
	
}
