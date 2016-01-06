var focus_follows_mouse = {
	
	previous_page_scroll_value : 0,
	previous_mouse_position_x : 0,
	previous_mouse_position_y : 0,
	
	element_hovered : function(event)
	{
		if ( ! focus_follows_mouse.check_for_active_element()
		&& focus_follows_mouse.page_content_selected()) {
			return;
		}
		if (event.buttons) {
			return;
		}
		if ( ! focus_follows_mouse.page_scrolled()
		&& focus_follows_mouse.mouse_moved(event)) {
			focus_follows_mouse.focus_hovered_element_if_tag_is_specified(event);
		}
	},
	
	check_for_active_element : function()
	{
		var active_element = document.activeElement;
		if ( active_element.localName !== 'body' ) {
			return true;
		} else {
			return false;
		}
	},
	
	page_content_selected : function()
	{
		if (document.getSelection().toString() == '') {
			return false;
		} else {
			return true;
		}
	},
	
	page_scrolled : function()
	{
		var page_scrolled;
		
		if (window.pageYOffset != focus_follows_mouse.previous_page_scroll_value) {
			page_scrolled = true;
		} else {
			page_scrolled = false;
		}
		
		focus_follows_mouse.previous_page_scroll_value = window.pageYOffset;
		
		return page_scrolled;
	},
	
	mouse_moved : function(event)
	{
		if (focus_follows_mouse.previous_mouse_position_x == event.clientX
		&& focus_follows_mouse.previous_mouse_position_y == event.clientY) {
			return false;
		}
		
		focus_follows_mouse.previous_mouse_position_x = event.clientX;
		focus_follows_mouse.previous_mouse_position_y = event.clientY;
		
		return true;
	},
	
	focus_hovered_element_if_tag_is_specified : function(event)
	{
		var hovered_element = event.target;
		if (hovered_element.tagName == 'INPUT'
		|| hovered_element.tagName == 'SELECT'
		|| hovered_element.tagName == 'TEXTAREA'
		|| hovered_element.tagName == 'BUTTON') {
			hovered_element.focus();
		} else if (hovered_element.getAttribute('for')) {
			if (hovered_element.tagName == 'LABEL') {
				var associated_element_id = hovered_element.getAttribute('for');
				if (associated_element_id) {
					var element_to_focus = document.getElementById(associated_element_id);
					if (element_to_focus) {
						element_to_focus.focus();
					}
				}
			}
		}
	}
	
};

window.addEventListener(
	'mouseover',
	focus_follows_mouse.element_hovered,
	false
);