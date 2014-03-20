package misc.dwr.bean;

public class Country {
	
	private int code;
	private String name;

	public Country() {
	}

	public Country(int c, String n) {
		code = c;
		name = n;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
