package com.openclassrooms.mddapi.service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document.OutputSettings;
import org.jsoup.safety.Safelist;
import org.springframework.stereotype.Service;

import com.vladsch.flexmark.html.HtmlRenderer;
import com.vladsch.flexmark.html2md.converter.FlexmarkHtmlConverter;
import com.vladsch.flexmark.parser.Parser;
import com.vladsch.flexmark.util.data.MutableDataSet;

@Service
public class ContentCleanerService {

    /**
     * Strip html tags from a string
     *
     * @param unsafeString html content
     * @return sanitized html content
     */
    public String stripHtml(String unsafeString) {
        var outputSettings = new OutputSettings();
        return Jsoup.clean(unsafeString, "", Safelist.none(), outputSettings.prettyPrint(false));
    }

    /**
     * Sanitize markdown content
     * Converts to html then renders to markdown
     *
     * @param unsafeString markdown content
     * @return sanitized markdown content
     */
    public String sanitizeMarkdown(String unsafeString) {
        String htmlString;
        var options = new MutableDataSet();
        var parser = Parser.builder(options).build();
        var converter = FlexmarkHtmlConverter.builder(options).build();
        var renderer = HtmlRenderer.builder(options).build();

        htmlString = renderer.render(parser.parse(unsafeString));

        return converter.convert(htmlString);
    }
}
