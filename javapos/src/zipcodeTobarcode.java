import java.lang.*;

class  zipcodeTobarcode extends translatezipcodeTobarcode
{
    public String  buildStringBarcode(String zipcode) {
        //  translatezipcodeTobarcode code = new translatezipcodeTobarcode();
        boolean hascodes =checkeFormatZip(zipcode);
        if (hascodes == true) {
            String codes = getFormatZipcode(zipcode);
            String ziptobarcode =matchbyTable(codes);
            System.out.println(ziptobarcode);
            return ziptobarcode;
        }
        else  return "false";
    }
  /*  public static void main(String[] args)
    {
        new zipcodeTobarcode().buildStringBarcode("12345");
    }*/
}