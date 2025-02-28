package com.openclassrooms.mddapi.service;

import java.util.Arrays;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.commonmark.ext.autolink.AutolinkExtension;
import org.commonmark.ext.gfm.strikethrough.StrikethroughExtension;
import org.commonmark.ext.gfm.tables.TablesExtension;
import org.commonmark.parser.Parser;
import org.commonmark.renderer.html.HtmlRenderer;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document.OutputSettings;
import org.jsoup.safety.Safelist;
import org.springframework.stereotype.Service;

import com.vladsch.flexmark.html2md.converter.FlexmarkHtmlConverter;
import com.vladsch.flexmark.util.data.MutableDataSet;

@Service
public class ContentCleanerService {
    private static final Logger logger = LogManager.getLogger(ContentCleanerService.class.getName());

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
        var markdownParser = Parser.builder()
                .extensions(Arrays.asList(
                        StrikethroughExtension.create(),
                        TablesExtension.create(),
                        AutolinkExtension.create()))
                .build();

        var markdownDocument = markdownParser.parse(unsafeString);

        var htmlRenderer = HtmlRenderer.builder()
                .extensions(Arrays.asList(
                        StrikethroughExtension.create(),
                        TablesExtension.create(),
                        AutolinkExtension.create()))
                .escapeHtml(true)
                .sanitizeUrls(false)
                .percentEncodeUrls(true)
                .softbreak("<br>")
                .build();
        var options = new MutableDataSet();
        options.set(FlexmarkHtmlConverter.MAX_BLANK_LINES, 1);
        options.set(FlexmarkHtmlConverter.RENDER_COMMENTS, false);
        options.set(FlexmarkHtmlConverter.MAX_TRAILING_BLANK_LINES, 1);
        var htmlToMarkDownConverter = FlexmarkHtmlConverter.builder(options).build();

        String htmlString = htmlRenderer.render(markdownDocument);

        String sanitizedString = htmlToMarkDownConverter.convert(htmlString)
                // Manually remove comments
                .replaceAll("<!--.*?-->", "");

        logger.debug("Unsanitized markdown: {}", unsafeString);
        logger.debug("Sanitized html: {}", htmlString);
        logger.debug("Sanitized markdown: {}", sanitizedString);

        return sanitizedString;
    }
}
