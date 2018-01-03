module.exports = {
    config: {
        a_style: 'page-link',
        a_active: '',
        li_active: 'active',
        li_style: 'page-item',
        record_per_page: 16,
        link_per_page: 5,
        link: '',
    },
    addConfig: function(config) {
        if (config.a_style) {
            this.config.a_style = config.a_style;
        }
        if (config.a_active) {
            this.config.a_active = config.a_active;
        }
        if (config.li_active) {
            this.config.li_active = config.li_active;
        }
        if (config.li_style) {
            this.config.li_style = config.li_style;
        }
        if (config.record_per_page) {
            this.config.record_per_page = config.record_per_page;
        }
        if (config.link_per_page) {
            this.config.link_per_page = config.link_per_page;
        }
        if (config.a_active) {
            this.config.a_active = config.a_active;
        }
        if (config.link) {
            this.config.link = config.link;
        }
        if (config.total_record) {
            this.config.total_record = config.total_record;
        }
        if (config.current_page) {
            this.config.current_page = config.current_page;
        }
      	return this.config;
    },
    initConfig: function(config) {
        if (config.total_record == 0) {
            config.total_page = 0;

            return config;
        }
        else {
            config.total_page = Math.ceil(config.total_record / config.record_per_page);
            if (config.total_page == 1) {
                config.current_page = 1;

                return config;
            }
            if (config.link_per_page == 1) {
                config.start = config.current_page;
                config.stop = config.current_page;

                return config;
            }
            if (config.current_page > config.total_page) {
                config.current_page = 1;
                config.start = 1;
                config.stop = config.link_per_page;

                return config;
            }
            if (config.link_per_page >= config.total_page) {
                config.start = 1;
                config.stop = config.total_page;

                return config;
            }
            before = this.initBeforeCurrent(config);
            after = this.initAfterCurrent(config);
            config.start = before.plan_start - after.add_before;
            config.stop = after.plan_stop + before.add_after;

            return config;
        }
    },
    initBeforeCurrent(config) {
        side_link_number = Math.floor(config.link_per_page / 2);
        plan_start = config.current_page - side_link_number;
        if (plan_start < 0) {
            return {
                plan_start: 1,
                add_after: side_link_number
            };
        }
        if (plan_start == 0) {
            return {
                plan_start: 1,
                add_after: 1
            };
        }
        return {
            plan_start: plan_start,
            add_after: 0
        };
    },
    initAfterCurrent: function(config) {
        side_link_number = Math.floor(config.link_per_page / 2);
        plan_stop = config.current_page + side_link_number;
        if (config.current_page == config.total_page) {
            return {
                plan_stop: config.current_page,
                add_before: side_link_number
            };
        }
        if (plan_stop > config.total_page) {
            return {
                plan_stop: config.current_page + plan_stop - config.total_page,
                add_before: plan_stop - config.total_page
            };
        }
        return {
            plan_stop: plan_stop,
            add_before: 0
        };
    },
    initLink: function(link, page_no) {
        if (link == '') {
            return 'javascript:void(0)';
        }
        return link.replace('{?}', page_no);
    },
    initView: function(link, content, config, page, li_active = '', a_active = '') {
        return `<li class='${config.li_style} ${li_active}'>
                    <a href='${link}' class='${config.a_style} ${a_active}' data-page='${page}'>
                        ${content}
                    </a>
                </li>`;
    },
    createView: function(config) {
        var view = '';
      	var tmp_link = '';
        if (config.current_page != 1) {
            tmp_link = this.initLink(config.link, 1);
            view += this.initView(tmp_link, "<i class='fa fa-angle-double-left'></i>", config, 1);
        }
        for (var i = config.start; i <= config.stop; i++) {
            if (i == config.current_page) {
                tmp_link = this.initLink(config.link, i);
                view += this.initView(tmp_link, i, config, '', config.li_active, config.a_active);
                continue;
            }
            tmp_link = this.initLink(config.link, i);
            view += this.initView(tmp_link, i, config, i);
        }
        if (config.current_page != config.total_page) {
            tmp_link = this.initLink(config.link, config.total_page);
            view += this.initView(tmp_link, "<i class='fa fa-angle-double-right'></i>", config, config.total_page);
        }
        return view;
    },
    paginate: function(config) {
        var configData = this.addConfig(config);
		configData = this.initConfig(configData);
        if (configData.total_page == 0) {
            return '';
        }
        if (configData.total_page == 1) {
            link = this.initLink(configData.link, 1);

            return this.initView(link , 1, configData, 1, configData.li_active, configData.a_active);
        }
        return this.createView(configData);
    }
}
