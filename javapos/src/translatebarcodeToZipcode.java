import java.util.Arrays;

public class translatebarcodeToZipcode {
    String id = "0123456789";
    String[] bar = {"||:::", ":::||", "::||:", "::||:", ":|::|", ":|:|:", ":||::", "|:::|", "|::|:", "|:|::"};

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String[] getBarcode() {
        return bar;
    }

    public void setBarcode(String[] barcode) {
        this.bar = barcode;
    }

    public boolean checkFormatBarcodes(String barcodes) {
        boolean hasBarcodes = true;
        char[] barcode = barcodes.toCharArray();
        for (int i = 0; i < barcode.length; i++) {
            boolean hascodes = barcode[i] == '|' || barcode[i] == ':';
            if (hascodes == false) hasBarcodes = false;
        }
        String newBarcodes = barcodes.substring(1, barcodes.length() - 1);
        String[] formatBarcodes = new String[newBarcodes.length() / 5];
        boolean haspost = false;
        if (hasBarcodes) {
            int j = 0, k = 0;
            for (int i = 0; i < newBarcodes.length(); i = i + 5, j++) {
                formatBarcodes[j] = newBarcodes.substring(i, i + 5);
                int positon = Arrays.binarySearch(bar, formatBarcodes[j]);
                if (positon != -1) {
                    haspost = true;
                }
            }
        }
        return haspost ? true : false;
    }

    public String matchbyZipCode(String formatBarcodes) {
        String Barcodes = formatBarcodes.substring(1, formatBarcodes.length() - 1);
        String[] newBarcodes = new String[Barcodes.length() / 5];
        int[] zipcode = new int[Barcodes.length() / 5];
        int sum = 0;
        for (int i = 0, j = 0; i < Barcodes.length(); i = i + 5,j++) {
            newBarcodes[j] = Barcodes.substring(i, i + 5);
            System.out.println(newBarcodes[j]);
            int positon = Arrays.binarySearch(bar, newBarcodes[j]);
            System.out.println(positon);
            sum += positon;
            zipcode[j] = positon;
        }
        if (sum % 10 == 0) {
            return zipcode.toString();
        } else return "false";
    }
   public String buildStringZipCode(String calculatedCd)
   {
       String matchZipCode=calculatedCd.substring(0,calculatedCd.length()-1);
       char[] code=matchZipCode.toCharArray();
       String zipCodes="";
       if(matchZipCode.length()==9)
       {
           for(int i=0;i<matchZipCode.length();i++)
           {
               if(i==5)
               {
                   zipCodes+="-";
               }
               zipCodes+=code[i];
           }
           return zipCodes;
       }else  return matchZipCode;
   }
   public static void  main(String [] args)
   {
       String barcode="|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|";
       translatebarcodeToZipcode code=new translatebarcodeToZipcode();
       boolean hascode=code.checkFormatBarcodes(barcode);
       if(hascode)
       {
           String codes=code.matchbyZipCode(barcode);
           String zip=code.buildStringZipCode(codes);
          // System.out.println(zip);
       }
   }
}









