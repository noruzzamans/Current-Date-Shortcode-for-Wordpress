<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Cdsfw_Current_Date_Menu {

    /**
     * The single instance of the class.
     */
    protected static $instance;

    /**
     * Constructor.
     * Adds filters to execute shortcodes in necessary places.
     *
     * @since 1.0
     */
    private function __construct() {
        add_action( 'admin_menu', array( $this, 'cdsfw_current_date_menu_page' ) );
    }

    /**
     * Callback function to add top-level menu page.
     *
     * @since 1.0
     */
    public function cdsfw_current_date_menu_page() {
        add_menu_page(
            'Current Date Shortcode',  // Page title
            'Current Date Shortcode',  // Menu title
            'manage_options',     // Capability required to access the page
            'current-date-settings', // Menu slug
            array( $this, 'cdsfw_current_date_settings_page_callback' ), // Callback function to render the page
            'dashicons-calendar-alt' // Icon URL or Dashicons class name
        );

        // Add a submenu item
        add_submenu_page(
            'current-date-settings',   // Parent slug
            'Documentation',           // Page title
            'Documentation',           // Menu title
            'manage_options',          // Capability required to access the page
            'current-date-doc',        // Menu slug
            array( $this, 'cdsfw_current_date_doc_page_callback' ) // Callback function to render the page
        );
    }

    /**
     * Callback function to render the menu page content.
     *
     * @since 1.0
     */
    public function cdsfw_current_date_settings_page_callback() {
        // Output your page content here
        echo '<div class="wrap">';
        echo '<h2>Hello</h2>';
        echo '<p>This is a custom menu page.</p>';
        echo '</div>';
    }

    /**
     * Callback function to render the submenu page content.
     *
     * @since 1.0
     */
    public function cdsfw_current_date_doc_page_callback() {
        ?>
        <div class="wrap about-wrap">

            <h1><?php echo esc_html__( 'Current Date Shortcode', 'current-date' ); ?></h1>

            <div class="col">
                <h3><?php esc_html_e( "Let's Get Started", 'current-date' ); ?></h3>
                <p class="about-text">
                    To display the current date on your posts or pages, simply insert the shortcode <strong>[current-date]</strong> where you want it to appear. If you wish to customize the display to include the month or year, you can modify the shortcode like this: <strong>[current-date format='F, Y']</strong>. <br><br>The shortcode utilizes PHP's date function, allowing you to specify any format you desire. This means you have the flexibility to choose the date format that best suits your needs.
                </p>
            </div>

            <div class="col">
                <p class="cdsfw_text">Explore the available date formats and choose the ones that best suit your requirements.</p>
                <table class="cdsfw_table">
                    <thead>
                    <tr>
                        <th>Format</th>
                        <th>Description</th>
                        <th>Returned values</th>
                    </tr>

                    </thead>

                    <tbody class="tbody">

                    <tr>
                        <td style="text-align: center;"><em class="emphasis">Day</em></td>
                        <td>---</td>
                        <td>---</td>
                    </tr>

                    <tr>
                        <td><em>d</em></td>
                        <td>The day of the month, with leading zeros if required (01 to 31)</td>
                        <td><em>01</em> to <em>31</em></td>
                    </tr>

                    <tr>
                        <td><em>D</em></td>
                        <td>A textual representation of a day, three letters</td>
                        <td><em>Mon</em> through <em>Sun</em></td>
                    </tr>

                    <tr>
                        <td><em>j</em></td>
                        <td>Day of the month without leading zeros</td>
                        <td><em>1</em> to <em>31</em></td>
                    </tr>

                    <tr>
                        <td><em>l</em> (lowercase &#039;L&#039;)</td>
                        <td>A full textual representation of the day of the week</td>
                        <td><em>Sunday</em> through <em>Saturday</em></td>
                    </tr>

                    <tr>
                        <td><em>N</em></td>
                        <td>ISO-8601 numeric representation of the day of the week (added in
                            PHP 5.1.0)</td>
                        <td><em>1</em> (for Monday) through <em>7</em> (for Sunday)</td>
                    </tr>

                    <tr>
                        <td><em>S</em></td>
                        <td>English ordinal suffix for the day of the month, 2 characters</td>
                        <td>
                            <em>st</em>, <em>nd</em>, <em>rd</em> or
                            <em>th</em>.  Works well with <em>j</em>
                        </td>
                    </tr>

                    <tr>
                        <td><em>w</em></td>
                        <td>Numeric representation of the day of the week</td>
                        <td><em>0</em> (for Sunday) through <em>6</em> (for Saturday)</td>
                    </tr>

                    <tr>
                        <td><em>z</em></td>
                        <td>The day of the year (starting from 0)</td>
                        <td><em>0</em> through <em>365</em></td>
                    </tr>

                    <tr>
                        <td style="text-align: center;"><em class="emphasis">Week</em></td>
                        <td>---</td>
                        <td>---</td>
                    </tr>

                    <tr>
                        <td><em>W</em></td>
                        <td>ISO-8601 week number of year, weeks starting on Monday</td>
                        <td>Example: <em>42</em> (the 42nd week in the year)</td>
                    </tr>

                    <tr>
                        <td style="text-align: center;"><em class="emphasis">Month</em></td>
                        <td>---</td>
                        <td>---</td>
                    </tr>

                    <tr>
                        <td><em>F</em></td>
                        <td>A full textual representation of a month, such as January or March</td>
                        <td><em>January</em> through <em>December</em></td>
                    </tr>

                    <tr>
                        <td><em>m</em></td>
                        <td>Numeric representation of a month, with leading zeros</td>
                        <td><em>01</em> through <em>12</em></td>
                    </tr>

                    <tr>
                        <td><em>M</em></td>
                        <td>A short textual representation of a month, three letters</td>
                        <td><em>Jan</em> through <em>Dec</em></td>
                    </tr>

                    <tr>
                        <td><em>n</em></td>
                        <td>Numeric representation of a month, without leading zeros</td>
                        <td><em>1</em> through <em>12</em></td>
                    </tr>

                    <tr>
                        <td><em>t</em></td>
                        <td>Number of days in the given month</td>
                        <td><em>28</em> through <em>31</em></td>
                    </tr>

                    <tr>
                        <td style="text-align: center;"><em class="emphasis">Year</em></td>
                        <td>---</td>
                        <td>---</td>
                    </tr>

                    <tr>
                        <td><em>L</em></td>
                        <td>Whether it&#039;s a leap year</td>
                        <td><em>1</em> if it is a leap year, <em>0</em> otherwise.</td>
                    </tr>

                    <tr>
                        <td><em>o</em></td>
                        <td>ISO-8601 week-numbering year. This has the same value as
                            <em>Y</em>, except that if the ISO week number
                            (<em>W</em>) belongs to the previous or next year, that year
                            is used instead. (added in PHP 5.1.0)</td>
                        <td>Examples: <em>1999</em> or <em>2003</em></td>
                    </tr>

                    <tr>
                        <td><em>Y</em></td>
                        <td>A full numeric representation of a year, 4 digits</td>
                        <td>Examples: <em>1999</em> or <em>2003</em></td>
                    </tr>

                    <tr>
                        <td><em>y</em></td>
                        <td>A two digit representation of a year</td>
                        <td>Examples: <em>99</em> or <em>03</em></td>
                    </tr>

                    <tr>
                        <td style="text-align: center;"><em class="emphasis">Time</em></td>
                        <td>---</td>
                        <td>---</td>
                    </tr>

                    <tr>
                        <td><em>a</em></td>
                        <td>Lowercase Ante meridiem and Post meridiem</td>
                        <td><em>am</em> or <em>pm</em></td>
                    </tr>

                    <tr>
                        <td><em>A</em></td>
                        <td>Uppercase Ante meridiem and Post meridiem</td>
                        <td><em>AM</em> or <em>PM</em></td>
                    </tr>

                    <tr>
                        <td><em>B</em></td>
                        <td>Swatch Internet time</td>
                        <td><em>000</em> through <em>999</em></td>
                    </tr>

                    <tr>
                        <td><em>g</em></td>
                        <td>12-hour format of an hour without leading zeros</td>
                        <td><em>1</em> through <em>12</em></td>
                    </tr>

                    <tr>
                        <td><em>G</em></td>
                        <td>24-hour format of an hour without leading zeros</td>
                        <td><em>0</em> through <em>23</em></td>
                    </tr>

                    <tr>
                        <td><em>h</em></td>
                        <td>12-hour format of an hour with leading zeros</td>
                        <td><em>01</em> through <em>12</em></td>
                    </tr>

                    <tr>
                        <td><em>H</em></td>
                        <td>24-hour format of an hour with leading zeros</td>
                        <td><em>00</em> through <em>23</em></td>
                    </tr>

                    <tr>
                        <td><em>i</em></td>
                        <td>Minutes with leading zeros</td>
                        <td><em>00</em> to <em>59</em></td>
                    </tr>

                    <tr>
                        <td><em>s</em></td>
                        <td>Seconds, with leading zeros</td>
                        <td><em>00</em> through <em>59</em></td>
                    </tr>

                    <tr>
                        <td><em>u</em></td>
                        <td>
                            Microseconds (added in PHP 5.2.2). Note that
                            <span class="function"><strong>date()</strong></span> will always generate
                            <em>000000</em> since it takes an <span class="type"><a href="language.types.integer.php" class="type integer">integer</a></span>
                            parameter, whereas <span class="methodname"><a href="datetime.format.php" class="methodname">DateTime::format()</a></span> does
                            support microseconds if <a href="class.datetime.php" class="classname">DateTime</a> was
                            created with microseconds.
                        </td>
                        <td>Example: <em>654321</em></td>
                    </tr>

                    <tr>
                        <td><em>v</em></td>
                        <td>
                            Milliseconds (added in PHP 7.0.0). Same note applies as for
                            <em>u</em>.
                        </td>
                        <td>Example: <em>654</em></td>
                    </tr>

                    <tr>
                        <td style="text-align: center;"><em class="emphasis">Timezone</em></td>
                        <td>---</td>
                        <td>---</td>
                    </tr>

                    <tr>
                        <td><em>e</em></td>
                        <td>Timezone identifier (added in PHP 5.1.0)</td>
                        <td>Examples: <em>UTC</em>, <em>GMT</em>, <em>Atlantic/Azores</em></td>
                    </tr>

                    <tr>
                        <td><em>I</em> (capital i)</td>
                        <td>Whether or not the date is in daylight saving time</td>
                        <td><em>1</em> if Daylight Saving Time, <em>0</em> otherwise.</td>
                    </tr>

                    <tr>
                        <td><em>O</em></td>
                        <td>Difference to Greenwich time (GMT) in hours</td>
                        <td>Example: <em>+0200</em></td>
                    </tr>

                    <tr>
                        <td><em>P</em></td>
                        <td>Difference to Greenwich time (GMT) with colon between hours and minutes (added in PHP 5.1.3)</td>
                        <td>Example: <em>+02:00</em></td>
                    </tr>

                    <tr>
                        <td><em>T</em></td>
                        <td>Timezone abbreviation</td>
                        <td>Examples: <em>EST</em>, <em>MDT</em> ...</td>
                    </tr>

                    <tr>
                        <td><em>Z</em></td>
                        <td>Timezone offset in seconds. The offset for timezones west of UTC is always
                            negative, and for those east of UTC is always positive.</td>
                        <td><em>-43200</em> through <em>50400</em></td>
                    </tr>

                    <tr>
                        <td style="text-align: center;"><em class="emphasis">Full Date/Time</em></td>
                        <td>---</td>
                        <td>---</td>
                    </tr>

                    <tr>
                        <td><em>c</em></td>
                        <td>ISO 8601 date (added in PHP 5)</td>
                        <td>2004-02-12T15:19:21+00:00</td>
                    </tr>

                    <tr>
                        <td><em>r</em></td>
                        <td><a href="http://www.faqs.org/rfcs/rfc2822" class="link external">&raquo;&nbsp;RFC 2822</a> formatted date</td>
                        <td>Example: <em>Thu, 21 Dec 2000 16:01:07 +0200</em></td>
                    </tr>

                    <tr>
                        <td><em>U</em></td>
                        <td>Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)</td>
                        <td>See also <span class="function"><a href="function.time.php" class="function">time()</a></span></td>
                    </tr>

                    </tbody>

                </table>
            </div>

        </div>


        <?php
    }

    /**
     * Returns an instance of the class.
     *
     * @since 1.0
     */
    public static function get_instance() {
        if ( is_null( self::$instance ) ) {
            self::$instance = new self();
        }

        return self::$instance;
    }
}

// Initialize the menu
Cdsfw_Current_Date_Menu::get_instance();
