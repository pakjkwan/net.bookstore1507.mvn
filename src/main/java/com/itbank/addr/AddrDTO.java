package com.itbank.addr;

import org.springframework.stereotype.Component;

@Component
public class AddrDTO {
	private int addrSeq;
	private String userid;
	private String zipCode;
	private String superCity;
	private String province;
	private String city;
	private String guGun;
	private String doro;
	private String doroNo;
	private String gita;
	public int getAddrSeq() {
		return addrSeq;
	}
	public void setAddrSeq(int addrSeq) {
		this.addrSeq = addrSeq;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getZipCode() {
		return zipCode;
	}
	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	public String getSuperCity() {
		return superCity;
	}
	public void setSuperCity(String superCity) {
		this.superCity = superCity;
	}
	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		this.province = province;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getGuGun() {
		return guGun;
	}
	public void setGuGun(String guGun) {
		this.guGun = guGun;
	}
	public String getDoro() {
		return doro;
	}
	public void setDoro(String doro) {
		this.doro = doro;
	}
	public String getDoroNo() {
		return doroNo;
	}
	public void setDoroNo(String doroNo) {
		this.doroNo = doroNo;
	}
	public String getGita() {
		return gita;
	}
	public void setGita(String gita) {
		this.gita = gita;
	}
	
	
}
