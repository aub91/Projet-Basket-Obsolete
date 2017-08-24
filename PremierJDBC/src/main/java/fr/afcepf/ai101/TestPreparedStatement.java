package fr.afcepf.ai101;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;

public class TestPreparedStatement {
	public static void main(String[] args) {
		String username = "root";
		String password="";
		String driver = "com.mysql.jdbc.Driver";
		String url = "jdbc:mysql://127.0.0.1/ai101_jdbc";
		Connection cnx = null;
		try {
			Class.forName(driver);
			cnx=DriverManager.getConnection(url, username, password);
			
			String req ="INSERT INTO personne (nom, tel, prenom, naissance) "
				+"VALUES (?, ?, ?, ?)";
			
			PreparedStatement pstmt = cnx.prepareStatement(req, Statement.RETURN_GENERATED_KEYS);
			pstmt.setString(1, "titi");
			pstmt.setString(2, "tel de titi");
			pstmt.setString(3, "titi");
			String dateNaissanceString = "21/12-2012";
			SimpleDateFormat sdf = new SimpleDateFormat("dd/MM-yyyy");
			java.util.Date dateNaissance = sdf.parse(dateNaissanceString);
			pstmt.setDate(4, new java.sql.Date(dateNaissance.getTime()));
			
			int nbLigne= pstmt.executeUpdate();
			System.out.println(nbLigne);
			ResultSet rs = pstmt.getGeneratedKeys();
			rs.next();
			Integer generatedId = rs.getInt(1);
			System.out.println(generatedId);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				cnx.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
}
