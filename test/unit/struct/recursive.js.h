typedef struct my_struct
{
  struct my_struct *my_recursive_struct;
} my_struct_t;

void do_stuff(my_struct_t stuff);
