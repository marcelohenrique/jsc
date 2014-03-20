package teste.jscomponents;

import java.io.IOException;
import java.io.InputStream;
import java.io.Writer;
import java.util.Enumeration;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class XHRServlet
 * 
 * serve para testarmos as chamadas XHR que podemos fazer com nosso componente
 * assíncrono
 */
@SuppressWarnings("unchecked")
public final class XHRServlet extends HttpServlet {
	private static final long serialVersionUID = 123321123L;

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		System.out.println("get");
		// binaryPrint(request);
		retorne(request, response, "get");
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		System.out.println("post");
		binaryPrint(request);
		retorne(request, response, "post");
	}

	protected void doPut(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		System.out.println("put");
		binaryPrint(request);
		retorne(request, response, "put");
	}

	protected void doDelete(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		System.out.println("delete");
		binaryPrint(request);
		retorne(request, response, "delete");
	}

	protected void doHead(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		retorne(request, response, "head");
		System.out.println("head");
	}

	protected void doOptions(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		retorne(request, response, "options");
		System.out.println("options");
	}

	protected void doTrace(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		retorne(request, response, "trace");
		System.out.println("trace");
	}

	private void retorne(HttpServletRequest request,
			HttpServletResponse response, String msg) throws IOException {
		Enumeration<String> col = request.getParameterNames();
		String chave;
		while (col.hasMoreElements())
			System.out.println((chave = col.nextElement()) + "\t:\t"
					+ request.getParameter(chave));
		Writer w = response.getWriter();
		response.setContentType("text/html");
		w.write("pong do " + msg);
		w.flush();
		w.close();
	}

	/*
	 * interessante: se eu pegar a stream antes de tentar os parameters ele não
	 * devolve os parameters que por ventura viessesm via form-urlencoded.
	 */
	private void binaryPrint(HttpServletRequest request) throws IOException {
		InputStream in = request.getInputStream();
		byte[] buffer = new byte[1024];// put tem que pegar a stream ou o reader
		int i = -1;
		String s = "";
		while ((i = in.read(buffer)) > -1)
			s += new String(buffer, 0, i);
		//findbugs não gosta do loop acima...
		System.out.println(s);
	}
}
