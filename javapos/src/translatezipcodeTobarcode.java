import java.lang.reflect.Array;
import java.util.Arrays;
import java.lang.String;
import java.lang.ArrayIndexOutOfBoundsException;


public class translatezipcodeTobarcode {
    String id = "0123456789";
    String[] barcode = {"||:::", ":::||", "::||:", "::||:", ":|::|", ":|:|:", ":||::", "|:::|", "|::|:", "|:|::"};

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String[] getBarcode() {
        return barcode;
    }

    public void setBarcode(String[] barcode) {
        this.barcode = barcode;
    }

    public boolean checkeFormatZip(String zipcode) {
        boolean hasLength = (zipcode.length() == 10 && zipcode.contains("-")) || zipcode.length() == 9 || zipcode.length() == 5;
        boolean hasLetter = true;
        boolean haspost = true;
        if (zipcode.contains("-")) {
            haspost = zipcode.indexOf("-") == zipcode.lastIndexOf("-") && zipcode.indexOf("-") == 5;
            if (haspost) {
                String[] code = zipcode.split("-");
                zipcode = code[0] + code[1];
            }
        }
        char[] code = zipcode.toCharArray();
        for (int i = 0; i < code.length; i++) {
            if (id.indexOf(code[i]) == -1) {
                hasLetter = false;
            }
        }
        boolean hascodes = hasLength && hasLetter && haspost;
        return hascodes ? true : false;
    }

    public String getFormatZipcode(String zipcode) {
        if (zipcode.contains("-") == true) {
            return zipcode.replace("-", "");
        } else return zipcode;
    }

    public String matchbyTable(String zipcode) {
        char[] codes = zipcode.toCharArray();
        int sum = 0;
        for (int i = 0; i < codes.length; i++) {
            sum += codes[i];
        }
        int cd = sum % 10 == 0 ? 0 : (10 - sum % 10);
        String ziptobarcode="|";
        for (int i = 0; i < codes.length; i++) {
            System.out.println((int)codes[i]-48);
            ziptobarcode+= barcode[(int)codes[i]-48];
        }
        System.out.println("zip: " + ziptobarcode);
        ziptobarcode+=barcode[cd]+ "|";
        return ziptobarcode;
    }
}

