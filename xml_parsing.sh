#!/bin/bash

file="listings"
insidelisting=0
thislisting=""
tempfile="tempfile.txt"
tempfile2="tempfile2.txt"
tempfile3="tempfile3.txt"
tempfile4="tempfile4.txt"

#   Url for xml listings not .md listings
url="https://www.lacdb.com/files/generated/export/listings-b23877-1686755018951.xml"

if [ -f "$file" ]; then
    echo "The $file file already exists."
    
    else
    curl -# -o listings $url
fi

while read line; do
   if [[ $line =~ "<listing>" ]]; then
          thislisting+=$line
          insidelisting=1
   fi
   if [[ $insidelisting -eq 1 ]]; then
        thislisting+=$line
   fi
        
   if [[ $line =~ "</listing>" ]]; then
        insidelisting=0
        echo $thislisting > $tempfile
        
            outputFile="$(grep -oP "<street1>(.*)</street1>" $tempfile | cut -d ">" -f 2 | cut -d "<" -f 1)"
            outputFile+=".md"
            outputFile=$(echo $outputFile | tr " " "-")
            mv $outputFile /usr/local/__site/src/_properties
            if test -f "$outputFile"; then
                rm "$outputFile"
            fi

        echo $outputFile
        
        echo "---" >> $outputFile
        echo "layout: property" >> $outputFile
        
        #   Name of "listing"
        
        STR="street1:name"
        IFS=: read -r var1 var2 <<< "$STR"
        echo "$var2:" `grep -oP "<$var1>(.*)</$var1>" $tempfile | cut -d ">" -f 2 | cut -d "<" -f 1` >> $outputFile
        
        #   Images
        
        echo "image:" >> $outputFile
        
        awk 'BEGIN { RS="</"; } /<additionalMediaURL>/' $tempfile > $tempfile2

        sed -i -e 's/defaultImageURL><additionalMediaURL>//g' $tempfile2
        sed -i -e 's/<defaultImageURL>//g' $tempfile2
        sed -i -e 's/defaultImageURL>//g' $tempfile2
        sed -i -e 's/<defaultImageURL//g' $tempfile2
        sed -i -e 's/defaultImageURL//g' $tempfile2
        sed -i -e 's/additionalMediaURL><additionalMediaURL>//g' $tempfile2
        sed -i -e 's/<additionalMediaURL>//g' $tempfile2
        sed -i -e 's/<additionalMediaURL//g' $tempfile2
        sed -i -e 's/additionalMediaURL>//g' $tempfile2
        sed -i -e 's/additionalMediaURL//g' $tempfile2
        
        grep -oP '(.*\.pdf)' $tempfile2 >> $tempfile3
        grep -oP '(.*\.xlsx)' $tempfile2 >> $tempfile3
        
        grep -v -f $tempfile3 $tempfile2 >> $tempfile4
    
        while read line4; 
        do
        echo -e "    - image_file: \"$line4\"" >> $outputFile
        done < "$tempfile4"
        
        STR="defaultImageURL:image-1"
        IFS=: read -r var1 var2 <<< "$STR"
        echo "$var2:" `grep -oP "<$var1>(.*)</$var1>" $tempfile | cut -d ">" -f 2 | cut -d "<" -f 1 | sed 's/^/"/;s/$/"/'` >> $outputFile
        
        #   Loop 1
        
        for STR in "street1:address" "city:city" "state:state" "county:parish" "ID:listingID" "status:status"
            do
                IFS=: read -r var1 var2 <<< "$STR"
                echo "$var2:" `grep -oP "<$var1>(.*)</$var1>" $tempfile | cut -d ">" -f 2 | cut -d "<" -f 1` >> $outputFile
            done
            
        #   Price
        
        STR="price:price"
        IFS=: read -r var1 var2 <<< "$STR"
        echo "$var2:" `grep -oP "<$var1>(.*)</$var1>" $tempfile | sed 's/\\$//g' | cut -d ">" -f 2 | cut -d "<" -f 1 | sed 's/^/"/;s/$/"/'` >> $outputFile
        
        #   Loop 2
        
        for STR in "landSize:Acres" "sizeRentable:SqFt" "Price-SqFt:Price-SqFt" "leaseOrSale:property-type" "subtype:property-subtype" "zoning:zoning" "yearBuilt:year-built" "lot-size:lot-size" "parking:parking" "fullName:agent" "phoneNumber:agent-phone"

            do
                IFS=: read -r var1 var2 <<< "$STR"
                echo "$var2:" `grep -oP "<$var1>(.*)</$var1>" $tempfile | cut -d ">" -f 2 | cut -d "<" -f 1` >> $outputFile
            done
            
        #   Featured Variable
        
        echo "featured: false" >> $outputFile
                
        #   Loop 3
        
        for STR in "directions:directions" "building-features:building-features" "cooling:cooling" "heating:heating" "sizeRentable:living-area" "living-area-source:living-area-source" "sizeUnits:living-area-units" "stories:stories" "constructionSiding:construction-materials" "door-features:door-features" "electric:electric" "foundation-details:foundation-details" "landSize:lot-features" "landSize:lot-size-area" "lot-size-square-feet:lot-size-square-feet" "sizeUnits:lot-size-units" "parkingDescription:parking-features" "road-frontage-type:road-frontage-type" "road-surface-type:road-surface-type" "roof:roof" "water-source:water-source" "wooded-percent:wooded-percent" "modifiedDate:last-updated" "plans:plans"
        
            do
                IFS=: read -r var1 var2 <<< "$STR"
                echo "$var2:" `grep -oP "<$var1>(.*)</$var1>" $tempfile | cut -d ">" -f 2 | cut -d "<" -f 1` >> $outputFile
            done
            
        #   End of file
                
        echo "files:" >> $outputFile
        
        while read line3; 
        do
        echo "    - file_name: " >> $outputFile
        echo "        - file: \"$line3\"" >> $outputFile
        done < "$tempfile3"
        
        echo "---" >> $outputFile
        
        STR="overview:overview"
        IFS=: read -r var1 var2 <<< "$STR"
        echo ""`grep -oP "<$var1>(.*)</$var1>" $tempfile | cut -d ">" -f 2 | cut -d "<" -f 1` >> $outputFile
        
        rm -rf $tempfile
        rm -rf $tempfile2
        rm -rf $tempfile3
        rm -rf $tempfile4
        thislisting=""
   fi
done < $file
echo "----------Finished----------"
