package misc.dwr.bean;

public class Cidade {

	private int code;
	private int cod_state;
	private String name;

	public Cidade() {
	}

	public Cidade(int c, int c2, String n) {
		code = c;
		cod_state = c2;
		name = n;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public int getCod_state() {
		return cod_state;
	}

	public void setCod_state(int cod_state) {
		this.cod_state = cod_state;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
