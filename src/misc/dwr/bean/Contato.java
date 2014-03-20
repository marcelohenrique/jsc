package misc.dwr.bean;

public class Contato {

	private int id;
	private String nome;
	private String endereco;
	private String telefone;
	
	private long timestamp;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public long getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
	}

	public Contato() {
		timestamp = System.currentTimeMillis();
	}

	public Contato(int i, String n, String e, String t) {
		this();
		id = i;
		nome = n;
		endereco = e;
		telefone = t;
	}

	public String imprimir() {
		return "id: " + id + "\tnome: " + nome + "\tendereco: " + endereco
				+ "\ttelefone: " + telefone;
	}

}
