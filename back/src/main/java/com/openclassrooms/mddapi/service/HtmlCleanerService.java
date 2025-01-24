package com.openclassrooms.mddapi.service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document.OutputSettings;
import org.jsoup.safety.Safelist;
import org.springframework.stereotype.Service;

@Service
public class HtmlCleanerService {

    public String stripHtml(String unsafeString) {
        var outputSettings = new OutputSettings();
        return Jsoup.clean(unsafeString, "", Safelist.none(), outputSettings.prettyPrint(false));
    }
}
