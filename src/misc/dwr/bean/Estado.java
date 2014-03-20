package misc.dwr.bean;

public class Estado {

	private int code;
	private int cod_country;
	private String name;

	public Estado() {
	}

	public Estado(int c, int c2, String n) {
		code = c;
		cod_country = c2;
		name = n;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public int getCod_country() {
		return cod_country;
	}

	public void setCod_country(int cod_country) {
		this.cod_country = cod_country;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
