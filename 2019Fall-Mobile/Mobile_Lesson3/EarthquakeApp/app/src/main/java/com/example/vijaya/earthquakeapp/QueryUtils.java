package com.example.vijaya.earthquakeapp;

import android.util.Log;

import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.Buffer;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

public class QueryUtils {
    /**
     * Tag for the log messages
     */
    private static final String LOG_TAG = QueryUtils.class.getSimpleName();

    /**
     * Create a private constructor because no one should ever create a {@link QueryUtils} object.
     * This class is only meant to hold static variables and methods, which can be accessed
     * directly from the class name QueryUtils (and an object instance of QueryUtils is not needed).
     */
    private QueryUtils() {
    }

    /**
     * Query the USGS dataset and return a list of {@link Earthquake} objects.
     */
    public static List<Earthquake> fetchEarthquakeData2(String requestUrl) {
        // An empty ArrayList that we can start adding earthquakes to
        List<Earthquake> earthquakes = new ArrayList<>();
        //  URL object to store the url for a given string
        URL url = null;
        // A string to store the response obtained from rest call in the form of string
        String jsonResponse = "";
        try {
            //TODO: 1. Create a URL from the requestUrl string and make a GET request to it
            url = new URL(requestUrl);
            //TODO: 2. Read from the Url Connection and store it as a string(jsonResponse)
            /*TODO: 3. Parse the jsonResponse string obtained in step 2 above into JSONObject to extract the values of
                       "mag","place","time","url"for every earth quake and create corresponding Earthquake objects with them
                       Add each earthquake object to the list(earthquakes) and return it. */

            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            try {
                BufferedReader in = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
                String inputLine;
                while ((inputLine = in.readLine()) != null ) {
                    JSONObject tmpJson = new JSONObject(inputLine);
                    double mag = tmpJson.isNull("mag") ?  null : tmpJson.getDouble("mag");
                    String loc = tmpJson.isNull("place") ?  null : tmpJson.getString("places");
                    //long time = tmpJson.isNull("time") ?  null : tmpJson.getString("time");
                    long time = 0;
                    String urlQuake = tmpJson.isNull("url") ?  null : tmpJson.getString("url");
                    Earthquake tmpQuake = new Earthquake( mag, loc, time, urlQuake);
                    earthquakes.add(tmpQuake);
                }
            } finally {
                urlConnection.disconnect();
            }

            // Return the list of earthquakes

        } catch (Exception e) {
            Log.e(LOG_TAG, "Exception:  ", e);
        }
        // Return the list of earthquakes
        return earthquakes;
    }
}
