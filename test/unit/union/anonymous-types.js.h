typedef union my_union
{
  void *my_void;
  union
  {
    void *my_a;
    void *my_b;
  };
  union
  {
    void *my_x;
    void *my_y;
    void *my_z;
  };
  struct
  {
    void *my_c;
    void *my_d;
  };
  struct
  {
    void *my_t;
    void *my_u;
    void *my_v;
  };
} my_union_t;

void do_stuff(my_union_t stuff);
