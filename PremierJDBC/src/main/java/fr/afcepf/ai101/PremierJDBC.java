package fr.afcepf.ai101;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Date;

public class PremierJDBC {
	public static void main(String[] args) {
		String username = "root";
		String password="";
		String driver = "com.mysql.jdbc.Driver";
		String url = "jdbc:mysql://127.0.0.1/ai101_jdbc";
		Connection cnx = null;
		try {
			Class.forName(driver);
			cnx=DriverManager.getConnection(url, username, password);
			cnx.setAutoCommit(false);
			String requete = "INSERT INTO personne (nom, prenom, tel, naissance) " + "VALUES "
			+"('Guilhem', 'Aubin', '+33125487965', '2012-12-21'),"
			+"('Guilhem', 'Claire', '+33101010101', '2012-12-21')";
			
			Statement stmt = cnx.createStatement();
			int nbLigne = stmt.executeUpdate(requete);
			System.out.println(nbLigne);
			
			String requeteSelect = "SELECT id, nom as toto, prenom, tel, naissance FROM personne";
			Statement stmt2=cnx.createStatement();
			ResultSet rs = stmt2.executeQuery(requeteSelect);
			while (rs.next()) {
				Integer id = rs.getInt(1);
				String nom = rs.getString("toto");
				String prenom = rs.getString("prenom");
				String tel = rs.getString("tel");
				Date naissance = rs.getDate("naissance");
				StringBuilder sb = new StringBuilder();
				sb.append("id: ").append(id).append("\t").append("nom: ").append(nom).append("\t")
				.append("prenom: ").append(prenom).append("\t")
				.append("tel: ").append(tel).append("\t")
				.append("naissance: ").append(naissance).append("\t");
				System.out.println(sb);
			}
			cnx.commit();
			//Bonjour
			
		} catch (SQLException | ClassNotFoundException e) {
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
